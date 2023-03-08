import React, {useState} from 'react';
import { FaUser } from 'react-icons/fa'

function Login() {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const onChangeText = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const {email,password} = formData;

  return (
    <>
      <section>
        <h1 className='headline'><FaUser /> Login to MarketApp</h1>
        <p>{email} {password}</p>
      </section>

      <section>
        <form>
          <div>
            <input 
              type='email'
              id='email'
              name='email'
              placeholder='Please enter your email'
              value={email}
              onChange={onChangeText}
            />
          </div>

          <div>
            <input 
              type='password'
              id='password'
              name='password'
              value={password}
              placeholder='Please enter your password'
              onChange={onChangeText}
            />
          </div>
        </form>
      </section>
    </>
  )
}

export default Login