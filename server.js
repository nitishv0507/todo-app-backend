import express  from "express";
import mongoose, { connect } from "mongoose";
import todoData from "./models/todoAppModel.js";
import cors from "cors";

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors({ origin: "*"}));

const MONGO_URI = 'mongodb+srv://admin:NitishVerma@cluster0.a4iqsms.mongodb.net/todoApp?retryWrites=true&w=majority';

// First step is create the item so use post method.
app.post("/todo", async (req, res) => {

    try {  
        
        console.log(req.body);
        
        await todoData.create(req.body);

        console.log("Item is succesfully is created");
        res.status(200).json({
            status: {
                code: 0,
                message: "Item is succesfully created"
            }
        });
        
    } catch (e) {
        console.log("Item is not created");
        res.status(500).json({
            status: {
                code: 1,
                message: "Item is not created"
            }
        })
    }
});


// when we post data to database then we need to get data for reading purpose so use get method.

app.get("/todo", async (req, res) => {

    try {

        const data = await todoData.find({});

        if(!data) {
            res.status(400).json({
                message: `Data is not found ${error.message}`
            });
        }

        res.status(200).json({
            status: {
                code: 0,
                message: "Data is Found Succesfully"
            },
            "data":data
        });
        
    } catch (error) {
        console.log("Data is not found");
        res.status(500).json({
            status:{
                code:1,
                message:`Data is not found ${data}`
            }
        });
    }
});

// when read the data so sometimes you need to update the data so use put method for this.

app.put("/todo/:id", async (req, res) => {

    const { id } = req.params;

    try {

        const data = await todoData.findByIdAndUpdate(id, req.body);
        
        if(!data) {
            res.status(400).json({
                message: `Data is not found ${error.message}`
            });
        }

        console.log(`Item is Updated Succesfully with id ${id}`);
        res.status(200).json({
            status: {
                code: 0,
                message: `Item is updated succesfuly with id ${id}`
            },
        });
        
    } catch (error) {
        console.log(`Item is not updated with id ${id}`);
        res.status(500).json({
            status: {
                code: 1,
                message: `Item is not updated with id ${id}`
            }
       })
    }
       
});


// If you want to get data drom specific id

app.get("/todo/:id", async (req, res) => {

    const { id } = req.params;

    try {

        const data = await todoData.findById(id);

            
        if(!data) {
            res.status(400).json({
                message: `Data is not found ${error.message}`
            });
        }

        console.log(`Item is found Succesfully with id ${id}`);
        res.status(200).json({
            status: {
                code: 0,
                message: `Item is found succesfuly with id ${id}`
            },
            "data":data
        });

        
        
    } catch (error) {
        console.log(`Item is not found with id ${id}`);
        res.status(500).json({
            status: {
                code: 1,
                message: `Item is not found with id ${id}`
            }
       })
    }
});

// Now we learn how to update data, So now here we are go to learn how to delete data using delete method.

app.delete("/todo/:id", async (req, res) => {

    const { id } = req.params;

    try {

        const data = await todoData.findByIdAndDelete(id);

        if(!data) {
            res.status(400).json({
                message: `Data is not found ${error.message}`
            });
        }

        console.log("Item is Succesfully deleted");

        res.status(200).json({
            status: {
                code: 0,
                message: `Item is deleted succesfuly with id ${id}`
            },
        });
    
        
    } catch (error) {
        console.log(`Item is not deleted with id ${id}`);
        res.status(500).json({
            status: {
                code: 1,
                message: `Item is not deleted with id ${id}`
            }
       })
    }
});


async function connectDB () {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("db is connected Succesfully");

        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });
        
    } catch (error) {
        console.log(`db is not connected ${error.message}`);
    }
}

connectDB();