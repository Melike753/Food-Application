// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
 //  let resp = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes?search=cake&key=fe2f01a3-872c-4058-a2b3-56bc052ff8be');

let apiURL = "https://forkify-api.herokuapp.com/api/v2/recipes";
let apikey = "ebc841ec-7625-497c-8691-34a8bd196461";

async function GetRecipes(recipeName, id, isAllShow)
{
    try
    {
        let resp = await fetch(`${apiURL}?search=${recipeName}&key=${apikey}`);
        if (!resp.ok)
        {
            throw new Error('HTTP error ' + resp.status);
        }

        let result = await resp.json();
        let Recipes = isAllShow ? result.data.recipes : result.data.recipes.slice(1, 7);
        showRecipes(Recipes, id);
    }
    catch (error)
    {
        console.error('Error fetching recipes:', error);
    }
}

function showRecipes(recipes, id)
{
    $.ajax({
        contentType: "application/json; charset=utf-8",
        dataType: 'html',
        type: 'POST',
        url: '/Recipe/GetRecipeCard',
        data: JSON.stringify(recipes),
        success: function (htmlResult) {
            $('#' + id).html(htmlResult);
            getAddedCarts();  
        },
        error: function (xhr, status, error) {
            console.error('Error calling server:', error);
        }
    });
}

async function getOrderRecipe(id, showId)
{
    try
    {
        let resp = await fetch(`${apiURL}/${id}?key=${apikey}`);
        if (!resp.ok)
        {
            throw new Error('HTTP error ' + resp.status);
        }

        let result = await resp.json();
        let recipe = result.data.recipe;
        showOrderRecipeDetails(recipe, showId);
    }
    catch (error)
    {
        console.error('Error fetching recipes:', error);
    }
}

function showOrderRecipeDetails(orderRecipeDetails, showId)
{
    $.ajax({
        url: '/Recipe/ShowOrder',
        data: orderRecipeDetails,
        dataType: 'html',
        method: 'POST',
        success: function (htmlResult) {
            $('#' + showId).html(htmlResult);
        },
        error: function (xhr, status, error) {
            console.error('Error calling server:', error);
        }
    });
}

// Order Page
function quantity(option)
{
    let qty = $('#qty').val();
    let price = parseInt($('#price').val());
    let totalAmount = 0;

    if (option === 'inc')
    {
        qty = parseInt(qty) + 1;
    }
    else
    {
        qty = qty == 1 ? qty : qty - 1;
    }

    totalAmount = price * qty;

    $('#qty').val(qty);
    $('#totalAmount').val(totalAmount);
}

// Add to Cart
async function cart()
{
    let iTag = $(this).children('i')[0];
    let recipeId = $(this).attr('data-recipeId');

    if ($(iTag).hasClass('fa-regular'))
    {
        let resp = await fetch(`${apiURL}/${recipeId}?key=${apikey}`);
        let result = await resp.json();
        let cart = result.data.recipe;
        cart.RecipeId = recipeId;
        delete cart.id;
        cartRequest(cart, 'SaveCart', 'fa-solid', 'fa-regular', iTag,false);
    }
    else
    {
        let data = { Id: recipeId };
        cartRequest(data, 'RemoveCartFromList', 'fa-regular', 'fa-solid', iTag,false);
    }
}

function cartRequest(data, action, addcls, removecls, iTag, isReload)
{
    $.ajax({
        url: '/Cart/' + action,
        type: 'POST',
        data: data,
        success: function (resp) {
            if (isReload)
            {
                location.reload();
            }
            else
            {
                $(iTag).addClass(addcls);
                $(iTag).removeClass(removecls);
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
}

$(document).ready(function ()
{
    getAddedCarts();
});

function getAddedCarts()
{
    $.ajax({
        url: '/Cart/GetAddedCarts',
        type: 'GET',
        dataType: 'json',
        success: function (result) {
            $('.addToCartIcon').each((index, spanTag) => {
                let recipeId = $(spanTag).attr("data-recipeId");
                for (var i = 0; i < result.length; i++) {
                    if (recipeId == result[i]) {
                        let itag = $(spanTag).children('i')[0];
                        $(itag).addClass('fa-solid');
                        $(itag).removeClass('fa-regular');
                        break;
                    }
                }
            })
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function getCartList()
{
    $.ajax({
        url: '/Cart/GetCartList',
        type: 'GET',
        dataType: 'html',
        success: function (result) {
            $('#showCartList').html(result);
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function removeCartfromList(id)
{
    let data = { Id: id };
    cartRequest(data, 'RemoveCartFromList', null, null, null, true);
}