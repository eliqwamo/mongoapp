import express from "express";
const router = express.Router();
import mongoose from "mongoose";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Account from "../models/Account.js";
import Category from '../models/category.js';
import Product from '../models/product.js';
import Auth from './auth.js';

router.get('/getProductsByCategoryId/:id', Auth, async(request,response) => {
    const cid = request.params.id;
    Product.find({associateCategory: cid})
    .populate('associateAccount')
    .populate('associateCategory')
    .then(allProducts => {
        return response.status(200).json({
            message: allProducts
        });
    })
    .catch(error => {
        return response.status(500).json({
            message: error.message
        });
    })
})


router.get('/getAllProducts', Auth, async(request,response) => {
    Product.find()
    .populate('associateAccount')
    .populate('associateCategory')
    .then(allProducts => {
        return response.status(200).json({
            message: allProducts
        });
    })
    .catch(error => {
        return response.status(500).json({
            message: error.message
        });
    })
})


router.post('/addProduct', Auth, async(request, response) => {

    const {
        associateCategory,
        productName,
        productPrice,
        productDescription,
        productImage,
        productStatus
    } = request.body;

    const id = mongoose.Types.ObjectId();

    const _product = new Product({
        _id : id,
        associateAccount:request.user._id,
        associateCategory:associateCategory,
        productName:productName,
        productPrice:productPrice,
        productDescription:productDescription,
        productImage:productImage,
        productStatus:productStatus
    });
    _product.save()
    .then(product_added => {
        return response.status(200).json({
            message: product_added
        });
    })
    .catch(error => {
        return response.status(500).json({
            message: error.message
        });
    })
})


router.get('/getCategories', async(request,response) => {
    //OPTION 1
    //FIND ALL
    const categories = await Category.find();
    //FIND ALL BY CONDITION
    //const categories = await Category.find({isPublished: true});
    //FIND ONE BY ID
    //const categories = await Category.findById('6405a33d6246d39cf2a20b93');
    //FIND ONE BY CONDITION
    //const categories = await Category.findOne({isPublished: true});

    response.status(200).json({
        categories: categories
    })

})

router.post('/createNewCategory', async(request, response) => {
    const id = mongoose.Types.ObjectId();
    const categoryName = request.body.categoryName;
    const _category = new Category({
        _id: id,
        categoryName: categoryName
    })
    _category.save()
    .then(results => {
        return response.status(200).json({
            results: results
        })
    })
    .catch(error => {console.log(error.message)})
})



//AUTH FUNCTIONS

//REGISTER
router.post('/register', async(request,response) => {
    //Get account info from body
    const {firstName,lastName,email,password} = request.body;
    //Check if user (email) exist
    const isAccountExist = await Account.findOne({email: email});
    if(isAccountExist){
        return response.status(200).json({
            message: 'Account exist'
        });
    }

    //password crypt
    const hash_password = await bcryptjs.hash(password,10);
    //create user in db
    const id = mongoose.Types.ObjectId();
    const _account = new Account({
        _id: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hash_password
    })
    _account.save()
    .then(results => {
        return response.status(200).json({
            results: results
        })
    })
    .catch(error => {console.log(error.message)})
})
//LOGIN
router.post('/login', async(request,response) => {
    //Get account info from client
    const {email,password} = request.body;
    //Check if user exist by email
    Account.findOne({email: email})
    .then(async account => {

        if(!account){
            return response.status(200).json({
                message: 'Account not exist'
            });
        }

    //Compare password
    const isMatch = await bcryptjs.compare(password, account.password);
    if (!isMatch) {
        return response.status(200).json({
            message: 'Password not match'
        });
    }

    //Generate JWT token
    const dataToToken = {
        _id: account._id,
        name: account.firstName + " " + account.lastName,
        email: account.email,
        avatar: account.avatar
    }
    const token = await jwt.sign({dataToToken}, process.env.JWT_KEY, {expiresIn:'30d'});
    //Response

    return response.status(200).json({
        message: account,
        token: token
    })

    })
    .catch(error => {
        return response.status(500).json({
            message: error.message
        })
    })


})


export default router;