import bcrypt from "bcryptjs";
const data={
    users:[
        {
            name:'John',
            email:'admin@example.com',
            password: bcrypt.hashSync('1234',8),  //bib bcrypt "8" mta3 9adech min mara hacher 2^8 = 256
            isAdmin:true,
        }

    ],
    products:[
        {
           
            name:'Nike slim shirt',
            category:'Slim shirts',
            image:'/images/image1.webp',
            price:120,
            brand:'Nike',
            rating:4.5,
            numReviws:12,
            description:'high quality product',
            countInStock:10,
        },
        {
            
            name:'adidas',
            category:'sport shirts',
            image:'/images/image2.webp',
            price:120,
            brand:'adidas',
            rating:3,
            numReviws:12,
            description:'high quality product',
            countInStock:10,
        },
        {
            
            name:'champions',
            category:' shirts',
            image:'/images/image3.jpg',
            price:120,
            brand:'champions',
            rating:2,
            numReviws:12,
            description:'high quality product',
            countInStock:10,
        },
        {
            name:'Nike shirt',
            category:' shirts',
            image:'/images/image4.jpg',
            price:120,
            brand:'Nike',
            rating:5,
            numReviws:12,
            description:'high quality product',
            countInStock:10,
        },
        {
            
            name:'Nike oversize shirt',
            category:'oversize shirts',
            image:'/images/image5.jpeg',
            price:120,
            brand:'Nike',
            rating:4,
            numReviws:12,
            description:'high quality product',
            countInStock:10,
        },
        {
            
            name:'Nike slim shirt',
            category:'Slim shirts',
            image:'images/image6.jpg',
            price:120,
            brand:'Nike',
            rating:1,
            numReviws:12,
            description:'high quality product',
            countInStock:10,
        }
    ]
};
export default data ;