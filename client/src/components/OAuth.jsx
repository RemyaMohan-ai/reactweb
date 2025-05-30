import {GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { SignInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async() =>{
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider)
            const res = await fetch('/api/auth/google',{
                method: 'POST',
                headers :{
                    'Content-Type':  'application/json'
                },
                body: JSON.stringify({
                    name : result.user.displayName,
                    email : result.user.email,
                    photo : result.user.photoURL
                })
            })
            const data = await res.json();
            console.log(data);
            dispatch(SignInSuccess(data))
            console.log(result);
            navigate('/')
            
        } catch (error) {
            console.log('couldnt log with the error',error);
            
        }
    }
  return (
    <button type='button' onClick={handleGoogleClick} className='bg-red-700 text-white rounded p-3 uppercase hover:opacity-95'>
      login with Google
    </button>
  )
}
