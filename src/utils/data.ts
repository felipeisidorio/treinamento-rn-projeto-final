import { ClientDB, insert } from "../store/sqlite/db";

export const Users = [
    {
        id: '1',
        name: 'Felipe Isidorio',
        username: 'felipe@felipe.com',
        email: 'felipe@felipe.com',
        password: '123',
    },
];
export const Clients : ClientDB[] = [
    {
        id: '',
        firstname: '',
        lastname: '',
        phone: '',
        whatsapp: '',
        email: '',
        deliveryWeekDays: ``,
        deliveryStartTime: '',
        deliveryEndTime: '',
        contactPreference: '',
        businessType: '',
        traceableDelivery: "",
        state: '',
    },
    {
        id: '0',
        firstname: 'Felipe',
        lastname: 'Isidorio',
        phone: '+55 81 99999-9999',
        whatsapp: '+55 81 99999-9999',
        email: 'felipe@felipe.com',
        deliveryWeekDays: `'1', '2', '3', '4', '5', '6'`,
        deliveryStartTime: '08:00',
        deliveryEndTime: '18:00',
        contactPreference: 'phone',
        businessType: 'comercial',
        traceableDelivery: "1",
        state: 'Active',
    },
];



export async function insertTest() {
    
await insert('Clients', [
    {column:'id', value: `${new Date().getTime()}`},
    {column:'firstname', value: 'Felipe'},
    {column:'lastname', value: 'Isidorio'},
    {column:'phone', value: '+55 81 99999-9999'},
    {column:'whatsapp', value: '+55 81 99999-9999'},
    {column:'email', value: 'felipe@felipe.com'},
    {column:'deliveryWeekDays', value: ['1', '2', '3', '4', '5', '6'].join()},
    {column:'deliveryStartTime', value: '08:00'},
    {column:'deliveryEndTime', value: '18:00'},
    {column:'contactPreference', value: 'phone'},
    {column:'businessType', value: 'comercial'},
    {column:'traceableDelivery', value: "1"},
    {column:'state', value: 'Active'}
    ]);
 
}
