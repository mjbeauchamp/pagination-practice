const express = require('express')

const app = express()

const fakeData = {
    numberOfProductsPerPage: 6,
    productList: [
        {
            name: "Boots",
            id: 1
        },
        {
            name: "Pants",
            id: 2
        },
        {
            name: "Shorts",
            id: 3
        },
        {
            name: "T-shirts",
            id: 4
        },
        {
            name: "Jackets",
            id: 5
        },
        {
            name: "Boots",
            id: 6
        },
        {
            name: "Pants",
            id: 7
        },
        {
            name: "Shorts",
            id: 8
        },
        {
            name: "T-shirts",
            id: 9
        },
        {
            name: "Jackets",
            id: 10
        },
        {
            name: "Boots",
            id: 11
        },
        {
            name: "Pants",
            id: 12
        },
        {
            name: "Shorts",
            id: 13
        },
        {
            name: "T-shirts",
            id: 14
        },
        {
            name: "Jackets",
            id: 15
        },
        {
            name: "Boots",
            id: 16
        },
        {
            name: "Pants",
            id: 17
        },
        {
            name: "Shorts",
            id: 18
        },
        {
            name: "T-shirts",
            id: 19
        },
        {
            name: "Jackets",
            id: 20
        },
        {
            name: "Boots",
            id: 21
        },
        {
            name: "Pants",
            id: 22
        },
        {
            name: "Shorts",
            id: 23
        },
        {
            name: "T-shirts",
            id: 24
        },
        {
            name: "Jackets",
            id: 25
        }
    ]
}

//find the total number of pages of six items you'll have
function findTotalPages(items, perPage){
    let decimalTotal = items /= perPage;
    let total = parseInt(decimalTotal, 10)
    let finalTotal = Number.isInteger(decimalTotal) ? total : (total + 1);
    console.log(finalTotal)
    return finalTotal;
}

app.get("/showpage/:currentpage", (req, res) => {
    //Create an object to send with all the item data and other data
    let myData = {};
    
    //Get the "page number" of the page that we want to show
    let currentpage = parseInt(req.params.currentpage)
    console.log(currentpage)
    
    //This is the total number of pages that you'll have at a given number of items per page
    myData.totalPages = findTotalPages(fakeData.productList.length, fakeData.numberOfProductsPerPage)

    //The starting index of the current "page" that is being requested
    let startIndex = currentpage === 1 ? 0 : ((currentpage - 1) * fakeData.numberOfProductsPerPage);
    console.log("Start index:", startIndex)

    //Selecting just the items from the data to send
    let pageItems = fakeData.productList.slice(startIndex, (startIndex + fakeData.numberOfProductsPerPage))

    //Set pageItems to be sent as itemList to front end
    myData.itemList = pageItems;
    
    res.send(myData)
})

app.listen(4000, () => {
    console.log('Server listineng on port 4000')
})