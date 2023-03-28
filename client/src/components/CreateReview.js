import axios from 'axios';
import React, {useContext, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom'
import { LoggedUserContext } from '../context/loggedUserContext'
import ('../cssFiles/navBar.css')
import ('../cssFiles/reviewCU.css')

const CreateReview = (props) => {
    const [errors, setErrors] = useState([]);
    const [restaurant, setRestaurant] = useState();
    const [rating, setRating] = useState("");
    const [review, setReview] = useState("");

    const {loggedUser, setLoggedUser} = useContext(LoggedUserContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('submit review')
        axios.post(`http://localhost:8000/api/postReview/${restaurant}`, {
            review,
            rating
        }, {withCredentials: true})
            .then ( res => {
                console.log(res.data)
                //Navigate back to the restaurant review section or main not sure which yet
                navigate('/Restaurants')
            } )
            .catch( res => setErrors(res) )
    }

    return (
        <div>
            <nav>
                <h1>MunchiesRev</h1>
                <div className='nav-btn'>
                    {loggedUser ? <button><Link to={'/login'}>Login</Link></button> : <button><Link to={'/Logout'}>Logout</Link></button>}
                </div>
            </nav>
            <div className='main-body'>
                <div className='left-side'>
                    <h2>Hello {loggedUser.firstName}, please make a review</h2>
                </div>
                <div className='right-side'>
                    <h2 className="mx-auto col-10 col-md-8 col-lg-6">
                        Create a Review!
                    </h2>
                    <form className="mx-auto col-10 col-md-8 col-lg-6" onSubmit={handleSubmit}>
                        <div className='row mb-4'>
                            <div className='col'>
                                <div className="form-outline">
                                    <label>Restaurant:</label>
                                    <select className="form-select" type='text' onChange={e=>setRestaurant(e.target.value)}>
                                        <option value='0'>Beans</option>
                                        <option value='1'>Frijoles</option>
                                    </select>
                                </div>
                            </div>
                            <div className='col'>
                                <div className='form-outline'>
                                    <label>Rating:</label>
                                    <select className="form-select" type='text' onChange={e=>setRating(e.target.value)}>
                                        <option value='1'>⭐</option>
                                        <option value='2'>⭐⭐</option>
                                        <option value='3'>⭐⭐⭐</option>
                                        <option value='4'>⭐⭐⭐⭐</option>
                                        <option value='5'>⭐⭐⭐⭐⭐</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Review:</label>
                            <textarea className="form-control" type='text' onChange={e=>setReview(e.target.value)}/>
                        </div>
                        <input className='submit-button' type='submit' value='Submit Review'/>
                    </form>
                </div>
            </div>
        </div>
)}

export default CreateReview;