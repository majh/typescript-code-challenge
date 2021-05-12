import * as fs from 'fs';
import * as util from 'util'
import { Writable } from 'stream';

var output_file = 'output.json';
var input_file = './data.json';
const read_file = util.promisify(fs.readFile);
const write_file = util.promisify(fs.writeFile);

// Identical in input and output data
interface Customer {
  id : string;          // Could this be better specified as a UUID ?
  name : string;
  address : string;
}

interface OrderIn {
    name : string;
    quantity : number;
    price : number;
}

interface OrderItem {
    quantity : number;
    price : number;
    item ?: string;      // transformed property only
    revenue ?: number;   // transformed property only
}

interface Order {
  [key: string]: OrderItem;
}

interface ObjectIn {
  id : number;
  vendor : string;
  date : string;        // Could this be a 'date' type ?
  customer : Customer;
  order : Order;
}

// Format of output 'orders'
interface OrdersOut {
    id      : number,
    vendor  : string,
    date    : string,
    customer: string,
    order   : OrderItem[]
}

// Output file format
interface Transformed {
    customers : Customer[],
    orders : OrdersOut[],
}

async function load_file(input_file: string) {
    const data = await read_file(input_file, 'utf8')
    return data;
}

const transform_order = (order: string, order_transform: OrderItem) => {
    let item: OrderItem = order_transform;
    console.log('transform_order');
    return item;
}

const transform_input = async (objects: ObjectIn[]): Promise<Transformed> => {
    // Building two seperate collections
    let customers: Customer[] = [];
    let orders: OrdersOut[] = []

   // by value
   for (var val of objects) {
       let customer = val["customer"]
       customers.push(customer)

       let order_obj = val["order"]
       let order_transform = order_obj;
       let orderItems: OrderItem[] = [];
       // extract the keys and transform the order output
       for (var key in order_obj) {
           let order: OrderItem = {
                item : key,
                quantity : order_obj[key].quantity,
                price: order_obj[key].price,
                revenue : order_obj[key].price * order_obj[key].quantity
           }
           orderItems.push(order)
       }

        let order_out: OrdersOut = {
            id      : val.id,
            vendor  : val.vendor,
            date    : val.date,
            customer: customer.id,
            order   : orderItems,
        }
        orders.push(order_out)
    }

    return new Promise((resolve, reject) => {
        var transformed : Transformed = {customers, orders};
        resolve(transformed)
    });
}

const parse_json = (data: string) => {
    return JSON.parse(data)
}

export const do_transform = async (input_file: string, output_file: string) => {
    try {
        const data = await load_file(input_file);
        const objects: ObjectIn[] = parse_json(data);
        const transformed = await transform_input(objects);

        await write_file(output_file, JSON.stringify(transformed));
    } catch (ex) {
        console.log(ex);
    }
}


do_transform(input_file, output_file)
