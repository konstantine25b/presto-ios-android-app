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
            throw error;
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

// Usage
export const API = new PrestoAPI('https://api.prestoreserve.ge');