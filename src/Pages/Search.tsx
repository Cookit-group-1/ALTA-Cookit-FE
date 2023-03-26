import React from 'react'
import CardPost from '../Components/CardPost'
import CardQuote from '../Components/CardQuote'
import Layout from '../Components/Layout'
import NavBottom from '../Components/NavBottom'
import NavSearch from '../Components/NavSearch'

const Search = () => {
    return (
        <Layout>
            <NavSearch />

            <CardPost
                verifiedUser={true}
                verifiedRecipe={true}
                username={"Udin"}
                profilePicture={"https://www.journeyera.com/wp-content/uploads/2016/09/portraits-indonesia-08569-1024x683.jpg.webp"}
                postType={"new recipe"}
                postPicture={"https://www.unileverfoodsolutions.co.id/dam/global-ufs/mcos/SEA/calcmenu/recipes/ID-recipes/soups/soto-betawi/main-header.jpg"}
                recipeName={"Soto Betawi"}
                commentAmt={32}
                likeAmt={120}
            />

            <CardPost
                verifiedUser={true}
                verifiedRecipe={true}
                username={"Udin"}
                profilePicture={"https://www.journeyera.com/wp-content/uploads/2016/09/portraits-indonesia-08569-1024x683.jpg.webp"}
                postType={"new recipe"}
                postPicture={"https://www.unileverfoodsolutions.co.id/dam/global-ufs/mcos/SEA/calcmenu/recipes/ID-recipes/soups/soto-betawi/main-header.jpg"}
                recipeName={"Soto Betawi"}
                commentAmt={32}
                likeAmt={120}
            />

            <CardPost
                verifiedUser={true}
                verifiedRecipe={true}
                username={"Udin"}
                profilePicture={"https://www.journeyera.com/wp-content/uploads/2016/09/portraits-indonesia-08569-1024x683.jpg.webp"}
                postType={"new recipe"}
                postPicture={"https://www.unileverfoodsolutions.co.id/dam/global-ufs/mcos/SEA/calcmenu/recipes/ID-recipes/soups/soto-betawi/main-header.jpg"}
                recipeName={"Soto Betawi"}
                commentAmt={32}
                likeAmt={120}
            />

            <CardPost
                verifiedUser={true}
                verifiedRecipe={true}
                username={"Udin"}
                profilePicture={"https://www.journeyera.com/wp-content/uploads/2016/09/portraits-indonesia-08569-1024x683.jpg.webp"}
                postType={"new recipe"}
                postPicture={"https://www.unileverfoodsolutions.co.id/dam/global-ufs/mcos/SEA/calcmenu/recipes/ID-recipes/soups/soto-betawi/main-header.jpg"}
                recipeName={"Soto Betawi"}
                commentAmt={32}
                likeAmt={120}
            />

            <NavBottom />
        </Layout>
    )
}

export default Search