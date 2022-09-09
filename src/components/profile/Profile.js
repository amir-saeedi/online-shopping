import React from 'react'
import { useNavigate, Link } from "react-router-dom";
import userContext from "../../contexts/user"
const Profile = () => {
    const navigation = useNavigate();
    const { user, setUser } = React.useContext(userContext)
    const [userProfile, setUserProfile] = React.useState(null)
    const profileAuth = () => {
        user ? navigation("/profile") : navigation("/login")
    }
    React.useEffect(() => {
        profileAuth()
        setUserProfile(getInitialState())
    }, [])
    console.log(user)
    function getInitialState() {
        return ({
            person: {
                name: user.name,
                bio: 'Software Engineer based in India'
            },
            image: 'http://static1.squarespace.com/static/55acc005e4b098e615cd80e2/t/57b057398419c2c454f09924/1471025851733/',
            quote: {
                content: 'Beautiful things don\'t ask for attention',
                source: 'The Secret Life of Walter Mitty'
            }
        });
    }
    console.log(userProfile)
    return (
        <div className="Profile">
            {userProfile &&
                <div className='flex_row login-theme' style={{ height: "100vh" }}>
                    <div className="width-50">
                        <img src={userProfile.image} className="width-50" style={{ borderRadius:"50%"}} alt={user.name} />
                    </div>
                    <div className='flex_column width-40'>
                        <h3 style={{color:"#fff"}}>{user.name}</h3>
                        <h6 style={{ color: "#fff" }}>{userProfile.person.bio}</h6>
                        <div><h4 style={{ color: "#fff" }}>{userProfile.quote.source}</h4></div>
                        <div className=''>
                            <Link to="/cart" className='btn'>Cart</Link>
                            <Link to="/bookmark" className='btn'>Bookmark</Link>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default Profile;
