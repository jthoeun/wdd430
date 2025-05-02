export class Contact {
    public id: number;
    public name: string;
    public email: string;
    public phone: number;
    public imageURL: string;
    public group: Contact[];

    constructor(id: number, name: string, email: string, phone: number, imageURL: string, group: Contact[] = []){
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.imageURL = imageURL;
        this.group = group;
    }
}