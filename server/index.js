const express = require('express')

const app = express()

//Dummy database
const fakeData = {
    //This number is how many items we want to show per page
    numberOfProductsPerPage: 6,
    //This list contains each item that we want to display
    productList: [
        {
            name: "Boots",
            id: 1,
            url: "https://www.purina.com.au/-/media/E6EDBEC8D61240E384E78A11E20645D2.ashx"
        },
        {
            name: "Pants",
            id: 2,
            url: "https://www.purina.com.au/-/media/E6EDBEC8D61240E384E78A11E20645D2.ashx"
        },
        {
            name: "Shorts",
            id: 3,
            url: "https://www.purina.com.au/-/media/E6EDBEC8D61240E384E78A11E20645D2.ashx"
        },
        {
            name: "T-shirts",
            id: 4,
            url: "https://www.purina.com.au/-/media/E6EDBEC8D61240E384E78A11E20645D2.ashx"
        },
        {
            name: "Jackets",
            id: 5,
            url: "https://www.purina.com.au/-/media/E6EDBEC8D61240E384E78A11E20645D2.ashx"
        },
        {
            name: "Boots",
            id: 6,
            url: "https://www.purina.com.au/-/media/E6EDBEC8D61240E384E78A11E20645D2.ashx"
        },
        {
            name: "Pants",
            id: 7,
            url: "https://www.purina.com.au/-/media/E6EDBEC8D61240E384E78A11E20645D2.ashx"
        },
        {
            name: "Shorts",
            id: 8,
            url: "https://www.purina.com.au/-/media/E6EDBEC8D61240E384E78A11E20645D2.ashx"
        },
        {
            name: "T-shirts",
            id: 9,
            url: "https://www.purina.com.au/-/media/E6EDBEC8D61240E384E78A11E20645D2.ashx"
        },
        {
            name: "Jackets",
            id: 10,
            url: "https://www.purina.com.au/-/media/E6EDBEC8D61240E384E78A11E20645D2.ashx"
        },
        {
            name: "Boots",
            id: 11,
            url: "https://www.purina.com.au/-/media/E6EDBEC8D61240E384E78A11E20645D2.ashx"
        },
        {
            name: "Pants",
            id: 12,
            url: "https://www.purina.com.au/-/media/E6EDBEC8D61240E384E78A11E20645D2.ashx"
        },
        {
            name: "Shorts",
            id: 13,
            url: "https://www.purina.com.au/-/media/E6EDBEC8D61240E384E78A11E20645D2.ashx"
        },
        {
            name: "T-shirts",
            id: 14,
            url: "https://www.purina.com.au/-/media/E6EDBEC8D61240E384E78A11E20645D2.ashx"
        },
        {
            name: "Jackets",
            id: 15,
            url: "https://www.purina.com.au/-/media/E6EDBEC8D61240E384E78A11E20645D2.ashx"
        },
        {
            name: "Boots",
            id: 16,
            url: "https://www.purina.com.au/-/media/E6EDBEC8D61240E384E78A11E20645D2.ashx"
        },
        {
            name: "Pants",
            id: 17,
            url: "https://www.purina.com.au/-/media/E6EDBEC8D61240E384E78A11E20645D2.ashx"
        },
        {
            name: "Shorts",
            id: 18,
            url: "https://www.purina.com.au/-/media/E6EDBEC8D61240E384E78A11E20645D2.ashx"
        },
        {
            name: "T-shirts",
            id: 19,
            url: "https://www.purina.com.au/-/media/E6EDBEC8D61240E384E78A11E20645D2.ashx"
        }
    ]
}

//find the total number of pages of six items you'll have
//This calculates how many pages you'll end up with, based on how many items you want to show per page and how many items  you have
function findTotalPages(items, perPage){
    let decimalTotal = items /= perPage;
    //This part turns any decimal into a solid integer, and it sets base 10 as the type of number you're entering
    let total = parseInt(decimalTotal, 10)
    //This makes sure that if you have less items than will fill an entire page, you don't end up with it saying "Page 0", since the integer will round it down to 0 if it divides to a number less than 1
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

    //Finding the starting index of the current "page" that is being requested
    let startIndex = currentpage === 1 ? 0 : ((currentpage - 1) * fakeData.numberOfProductsPerPage);
    console.log("Start index:", startIndex)

    //Selecting just the items from the data to send, starting with the start index and ending with the sum of the start index and the amount of products you want on each page
    let pageItems = fakeData.productList.slice(startIndex, (startIndex + fakeData.numberOfProductsPerPage))

    //Set pageItems to be sent as itemList to front end
    myData.itemList = pageItems;
    
    res.send(myData)
})

app.listen(4000, () => {
    console.log('Server listineng on port 4000')
})