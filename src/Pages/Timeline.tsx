import React, { useEffect } from 'react'
import CardPost from '../Components/CardPost'
import CardQuote from '../Components/CardQuote'
import NavBottom from '../Components/NavBottom'
import NavTop from '../Components/NavTop'
import Layout from '../Components/Layout'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

const Timeline = () => {
    const [cookies, setCookie] = useCookies(['user'])
    const navigate = useNavigate()

    useEffect(() => {
        if (cookies.user == undefined) {
            navigate('/login')
        }
    })

    return (
        <Layout>
            <div className='relative flex flex-col w-full sm:w-2/3 lg:w-1/2 max-w-xl items-center justify-center'>
                <NavTop />

                <CardPost
                    verifiedUser={false}
                    verifiedRecipe={false}
                    username={"Ucup"}
                    profilePicture={"https://static.mothership.sg/1/2018/12/karna-polly-indonesian-man-english-woman-married-02.jpg"}
                    postType={"cooked"}
                    postPicture={"https://img-global.cpcdn.com/recipes/9a65f25a4a512839/1200x630cq70/photo.jpg"}
                    description={"Akhirnya bisa masak juga ini, hasilnya lumayan lah"}
                    commentAmt={5}
                    likeAmt={13}
                >
                    <CardQuote
                        verifiedUser={true}
                        verifiedRecipe={true}
                        username={"Udin"}
                        profilePicture={"https://www.journeyera.com/wp-content/uploads/2016/09/portraits-indonesia-08569-1024x683.jpg.webp"}
                        postType={"new recipe"}
                        recipeName={"Soto Betawi"}
                        recipePicture={"https://www.unileverfoodsolutions.co.id/dam/global-ufs/mcos/SEA/calcmenu/recipes/ID-recipes/soups/soto-betawi/main-header.jpg"}
                    />
                </CardPost>

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
            </div>
        </Layout>
    )
}

export default Timeline