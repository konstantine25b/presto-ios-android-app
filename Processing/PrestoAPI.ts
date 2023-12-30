import axios from 'axios';
import {PrestoStorage} from "./PrestoStorage";

export interface RegistrationData {
    username: string;
    email: string;
    password: string;
}

export interface User{
    id: number;
    username: string;
    email: string;
    phone: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface EditEmailData {
    email: string;
    password: string;
}

export interface EditPhoneData {
    phone: string;
    password: string;
}

export interface OrderItem {
    dishId: number;
    notes: string;
}
//Used for getting an order
export interface OrderInfo {
    id: number;
    totalPrice: number;
    userID: number;
    restaurantId: number;
    orderState: number;
    orderItems: OrderItem[];
}
//Used for creating an order
export interface OrderData {
    restaurantId: number;
    orderTable?: number;
    orderRequestedDate: Date;
    orderItems: OrderItem[];
}

export interface DeleteAccountData {
    password: string;
}

export interface Dish {
    id: number;
    title: string;
    price: number;
    approxtime: number;
    description: string;
    image: string;
    ingredients: string[];
    categoryId: number;
    available?: boolean;
}

export interface Category {
    id: number;
    title: string;
    description: string;
    image: string;
    restaurantId: number;
    dishes: Dish[];
}

export interface Restaurant {
    id: number;
    title: string;
    shortdescription: string;
    description: string;
    address: string;
    rating: number;
    ratingquantity: number;
    images: string[];
    tags: string[];
    categories: Category[];
}

export class PrestoAPI {
    readonly baseUrl: string;
    protected token: string | null;
    private email: string | null;
    private password: string | null;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.token = null;
        this.email = null;
        this.password = null;
    }

    // Returns true if the user is logged in, false otherwise
    protected isLoggedIn(): boolean{
        return PrestoStorage.getItem('user_email')!==null && PrestoStorage.getItem('user_password')!==null;
    }

    // Logs in the user if they are not logged in already
    protected async loginIfNeeded(forced?: boolean): Promise<void> {
        if ((!this.token || forced)) {
            const storedEmail = await PrestoStorage.getItem('user_email');
            const storedPassword = await PrestoStorage.getItem('user_password');

            if (storedEmail && storedPassword) {
                this.email = storedEmail;
                this.password = storedPassword;

                const loginData: LoginData = { email: storedEmail, password: storedPassword };
                try {
                    const response = await axios.post(`${this.baseUrl}/login`, loginData);
                    this.token = response.data.token;
                } catch (error) {
                    //error handling, implement later
                }
            }
        }
    }

    // Registers a new user
    // Arguments:
    // username - string;
    // 	email - string;
    // 	password - string;
    async register(data: RegistrationData): Promise<boolean> {
        try {
            await axios.post(`${this.baseUrl}/register`, data);

            // Store the provided email and password
            this.email = data.email;
            this.password = data.password;

            await this.login(this.email, this.password);

            return true;
        } catch (error) {
            return false;
        }
    }

    // Logs in the user
    // Arguments:
    // email - string;
    // password - string;
    async login(email: string, password: string): Promise<boolean> {
        const loginData: LoginData = { email, password };
        try {
            const response = await axios.post(`${this.baseUrl}/login`, loginData);
            this.token = response.data.token;
            this.email = email;
            this.password = password;

            PrestoStorage.setItem('user_email', email);
            PrestoStorage.setItem('user_password', password);

            console.log("Writing data to PrestoStorage...")

            return true;
        } catch (error) {
            console.log("login was UnSuccessfull" ,error)
            // throw error; // es kotem daakomentara imitoro errori tvins chamda
            return false;
        }
    }

    // Returns the user's data
    // Returns:
    // User | null;
    // Which contains:
    // id - number;
    // username - string;
    // email - string;
    // phone - string;
    async getUser(): Promise<User | null> {
        await this.loginIfNeeded();
        try {
            const response = await axios.get(`${this.baseUrl}/user`, {
                headers: { Authorization: `Bearer ${this.token}` },
            });
            return response.data;
        } catch (error) {
            return null;
        }
    }


    // Edits the user's email
    // Arguments:
    // data - EditEmailData;
    // Which contains:
    // email - string;
    // password - string;
    async editEmail(data: EditEmailData): Promise<boolean> {
        await this.loginIfNeeded();
        try {
            await axios.patch(`${this.baseUrl}/user/editemail`, data, {
                headers: { Authorization: `Bearer ${this.token}` },
            });
            this.email = data.email;
            await this.loginIfNeeded(true);
            return true;
        } catch (error) {

            return false;
        }
    }

    // Edits the user's phone number
    // Arguments:
    // data - EditPhoneData;
    // Which contains:
    // phone - string;
    // password - string;
    async editPhone(data: EditPhoneData): Promise<boolean> {
        await this.loginIfNeeded();
        try {
            await axios.patch(`${this.baseUrl}/user/editphone`, data, {
                headers: { Authorization: `Bearer ${this.token}` },
            });
            return true;
        } catch (error) {
            return false;
        }
    }

    // Creates an order
    // Arguments:
    // data - OrderData;
    // Which contains:
    // restaurantId - number;
    // orderItems - OrderItem[];
    // Which contains:
    // dishId - number;
    // notes - string;
    async createOrder(data: OrderData, table: number = -1): Promise<number> {
        await this.loginIfNeeded();
        try {
            const res = await axios.post(`${this.baseUrl}/order`, data, {
                headers: {Authorization: `Bearer ${this.token}`},
            });
            return res.data;
        } catch (error) {
            console.log(error);
            return -1;
        }
    }

    // Cancels an order
    // Arguments:
    // orderId - number;
    async cancelOrder(orderId: number): Promise<boolean> {
        await this.loginIfNeeded();
        try {
            await axios.delete(`${this.baseUrl}/user/cancelorder/${orderId}`, {
                headers: { Authorization: `Bearer ${this.token}` },
            });
            return true;
        } catch (error) {
            return false;
        }
    }

    // Gets the user's orders
    // Returns:
    // OrderInfo[];
    // Which contains:
    // id - number;
    // totalPrice - number;
    // userID - number;
    // restaurantId - number;
    // orderState - number;
    async getOrders(): Promise<OrderInfo[]> {
        await this.loginIfNeeded();
        try {
            const response = await axios.get(`${this.baseUrl}/user/orders`, {
                headers: { Authorization: `Bearer ${this.token}` },
            });
            return response.data;
        } catch (error) {
            return [];
        }
    }

    // Gets the user's order by ID
    // Arguments:
    // orderId - number;
    // Returns:
    // OrderInfo | null;
    // Which contains:
    // id - number;
    // totalPrice - number;
    // userID - number;
    // restaurantId - number;
    // orderState - number;
    async getOrderById(orderId: number): Promise<OrderInfo | null> {
        await this.loginIfNeeded();
        try {
            const response = await axios.get(`${this.baseUrl}/user/order/${orderId}`, {
                headers: { Authorization: `Bearer ${this.token}` },
            });
            return response.data;
        } catch (error) {
            return null;
        }
    }

    // Deletes the user's account
    // Arguments:
    // data - DeleteAccountData;
    // Which contains:
    // password - string;
    async deleteAccount(data: DeleteAccountData): Promise<boolean> {
        await this.loginIfNeeded();
        try {
            await axios.delete(`${this.baseUrl}/user/deleteaccount`, {
                data,
                headers: { Authorization: `Bearer ${this.token}` },
            });
            // Clear stored credentials on successful account deletion
            this.token = null;
            this.email = null;
            this.password = null;
            return true;
        } catch (error) {

            return false;
        }
    }

    // Gets all restaurants
    // Returns:
    // Restaurant[];
    // Which contains:
    // id - number;
    // title - string;
    // shortdescription - string;
    // description - string;
    // address - string;
    // rating - number;
    // ratingquantity - number;
    // images - string[];
    // tags - string[];
    // categories - Category[];
    async getRestaurants(): Promise<Restaurant[]> {
        try {
            const response = await axios.get(`${this.baseUrl}/restaurants`);
            return response.data;
        } catch (error) {

            return [];
        }
    }

    // Gets a restaurant by ID
    // Arguments:
    // id - number;
    // Returns:
    // Restaurant | null;
    // Which contains:
    // id - number;
    // title - string;
    // shortdescription - string;
    // description - string;
    // address - string;
    // rating - number;
    // ratingquantity - number;
    // images - string[];
    // tags - string[];
    // categories - Category[];
    async getRestaurantById(id: number): Promise<Restaurant | null> {
        try {
            const response = await axios.get(`${this.baseUrl}/restaurant/id/${id}`);
            return response.data;
        } catch (error) {

            return null;
        }
    }

    // Gets a restaurant by title
    // Arguments:
    // title - string;
    // Returns:
    // Restaurant | null;
    // Which contains:
    // id - number;
    // title - string;
    // shortdescription - string;
    // description - string;
    // description - string;
    // address - string;
    // rating - number;
    // ratingquantity - number;
    // images - string[];
    // tags - string[];
    // categories - Category[];
    async getRestaurantByTitle(title: string): Promise<Restaurant | null> {
        try {
            const response = await axios.get(`${this.baseUrl}/restaurant/${title}`);
            return response.data;
        } catch (error) {

            return null;
        }
    }

    // Gets the top restaurants
    // Arguments:
    // quantity - number;
    // Returns:
    // Restaurant[];
    // Which contains:
    // id - number;
    // title - string;
    // shortdescription - string;
    // description - string;
    // address - string;
    // rating - number;
    // ratingquantity - number;
    // images - string[];
    // tags - string[];
    // categories - Category[];
    async getTopRestaurants(quantity: number): Promise<Restaurant[]> {
        try {
            const response = await axios.get(`${this.baseUrl}/restaurants/quantity/${quantity}`);
            return response.data;
        } catch (error) {

            return [];
        }
    }

    // Gets restaurants by page and quantity
    // Arguments:
    // page - number;
    // quantity - number;
    // Returns:
    // Restaurant[];
    // Which contains:
    // id - number;
    // title - string;
    // shortdescription - string;
    // description - string;
    // address - string;
    // rating - number;
    // ratingquantity - number;
    // images - string[];
    // tags - string[];
    // categories - Category[];
    async getRestaurantsByPageAndQuantity(page: number, quantity: number): Promise<Restaurant[]> {
        try {
            const response = await axios.get(`${this.baseUrl}/restaurants/quantity/${quantity}/page/${page}`);
            return response.data;
        } catch (error) {

            return [];
        }
    }

    // Searches restaurants
    // Arguments:
    // query - string;
    // Returns:
    // Restaurant[];
    // Which contains:
    // id - number;
    // title - string;
    // shortdescription - string;
    // description - string;
    // address - string;
    // rating - number;
    // ratingquantity - number;
    // images - string[];
    // tags - string[];
    // categories - Category[];
    async searchRestaurants(query: string): Promise<Restaurant[]> {
        try {
            const response = await axios.get(`${this.baseUrl}/search/${query}`);
            return response.data;
        } catch (error) {

            return [];
        }
    }

    // Gets restaurants by tag
    // Arguments:
    // tag - string;
    // Returns:
    // Restaurant[];
    // Which contains:
    // id - number;
    // title - string;
    // shortdescription - string;
    // description - string;
    // address - string;
    // rating - number;
    // ratingquantity - number;
    // images - string[];
    // tags - string[];
    // categories - Category[];
    async getRestaurantsByTag(tag: string): Promise<Restaurant[]> {
        try {
            const response = await axios.get(`${this.baseUrl}/tag/${tag}`);
            return response.data;
        } catch (error) {

            return [];
        }
    }

    // Gets a category by ID
    // Arguments:
    // id - number;
    // Returns:
    // Category | null;
    // Which contains:
    // id - number;
    // title - string;
    // description - string;
    // image - string;
    // restaurantId - number;
    // dishes - Dish[];
    async getCategoryById(id: number): Promise<Category | null> {
        try {
            const response = await axios.get(`${this.baseUrl}/category/id/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    // Gets a dish by ID
    // Arguments:
    // id - number;
    // Returns:
    // Dish | null;
    // Which contains:
    // id - number;
    // title - string;
    // price - number;
    // approxtime - number;
    // description - string;
    // image - string;
    // ingredients - string[];
    // categoryId - number;
    // available - boolean;
    async getDishById(id: number): Promise<Dish | null> {
        try {
            const response = await axios.get(`${this.baseUrl}/dish/id/${id}`);
            return response.data;
        } catch (error) {

            return null;
        }
    }

    // Gets an image
    // Arguments:
    // name - string;
    // Returns:
    // string | null (base64 encoded image);
    async getImage(name: string): Promise<string | null> {
        try {
            const response = await axios.get(`${this.baseUrl}/image/${name}`, { responseType: 'arraybuffer' });
            const base64Image = btoa(new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
            console.log(base64Image)
            return `data:image/jpeg;base64,${base64Image}`;
        } catch (error) {
            console.log(error)
            return null;
        }
    }
}

// es kotem daamata radgan dataBase.js idan miwevda gamodzaxeba
//#region Restaurant
const FoodCategories = [
    //Asian, Breakfast, Fast food, Chicken, Desserts, Fish, Healthy, Diet, Hot-dog, Mexican, Indian, European, Italian, Japanese, Alcohol, Soup, Sweets
    {
      MainImage:
        "https://www.aucklandairport.co.nz/-/media/Images/Traveller/Retail/Eat-and-Relax/Restaurant-main-images/McDonalds5.ashx",
      Type: "Fast Food",
    },
    {
      MainImage:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Khinkali_551.jpg/1200px-Khinkali_551.jpg",
      Type: "Georgian Cuisine",
    },
    {
      MainImage:
        "https://bridgecafecheltenham.co.uk/wp-content/uploads/2019/05/coffee.jpg",
      Type: "Cafe",
    },
    {
      MainImage:
        "https://www.wapititravel.com/blog/wp-content/uploads/2020/01/sashimi__healthy_japan_food.jpg",
      Type: "Asian",
    },
    {
      MainImage:
        "https://d.newsweek.com/en/full/1312719/breakfast-food-pancakes-stock-getty.jpg",
      Type: "Breakfast",
    },
    {
      MainImage:
        "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/bnyisqli4tyobvs3iikb",
      Type: "Pizza",
    },
    {
      MainImage:
        "https://wallsdesk.com/wp-content/uploads/2016/11/Fried-Chicken-for-desktop.jpg",
      Type: "Chicken",
    },
    {
      MainImage:
        "https://i1.wp.com/culinarylore.com/wp-content/uploads/2018/05/chocolate-cake-dessert.jpg?resize=480%2C316&ssl=1",
      Type: "Desserts",
    },
    {
      MainImage:
        "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/91b1a584826873.5d6906eb2a3d5.jpg",
      Type: "Fish",
    },
    {
      MainImage:
        "http://physicalsolutionsli.com/wp-content/uploads/2020/02/heart-diet-1024x680.jpg",
      Type: "Healthy",
    },
    {
      MainImage:
        "https://www.drweil.com/wp-content/uploads/2019/02/Macrobiotic-Diet-2-938448852.jpg",
      Type: "Diet",
    },
    {
      MainImage:
        "https://trueactivist.com/wp-content/uploads/2015/07/hotdog2.jpg",
      Type: "Hot dog",
    },
    {
      MainImage:
        "http://3.bp.blogspot.com/-YnIC50Thwjo/UVGXaV9pIbI/AAAAAAAAg7w/1gSgAj0G7_s/s1600/Mexican+Food+-+Resize.jpg",
      Type: "Mexican",
    },
    {
      MainImage:
        "https://www.washingtonpost.com/rf/image_1484w/2010-2019/WashingtonPost/2015/03/04/Interactivity/Images/iStock_000050497740_Full.jpg?t=20170517",
      Type: "Indian",
    },
    {
      MainImage:
        "https://www.aspirantsg.com/wp-content/uploads/2016/09/Wiener-Schnitzel-AspirantSG.jpg",
      Type: "European",
    },
    {
      MainImage:
        "https://i.huffpost.com/gen/964952/images/o-ITALIAN-FOOD-SURVEY-facebook.jpg",
      Type: "Italian",
    },
    {
      MainImage:
        "https://www.zastavki.com/pictures/1600x1200/2009/Food_Seafood_Japanese_Cuisine_Sushi_012022_.jpg",
      Type: "Japanese",
    },
    {
      MainImage:
        "https://cff2.earth.com/uploads/2019/04/03121800/Alcohol-induced-brain-damage-continues-even-after-quitting-drinking.jpg",
      Type: "Alcohol",
    },
   
  ];
/**
 * Gets all categories. In the future, it'll get data from the server time to time.
 * @returns {[{MainImage: string, Type: string},{MainImage: string, Type: string},{MainImage: string, Type: string},{MainImage: string, Type: string},{MainImage: string, Type: string},null,null,null,null,null,null,null,null,null,null,null,null,null,null]}
 */
export const getCategoriesList = () => {
    return FoodCategories;
  };

// Usage
export const API = new PrestoAPI('https://api.prestoreserve.ge');