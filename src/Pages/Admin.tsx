import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { BsCheckLg } from 'react-icons/bs'
import CardUser from '../Components/CardUser';
import Layout from '../Components/Layout';
import LoadingSpinner from '../Components/LoadingSpinner';
import NavBack from '../Components/NavBack';
import NavBottom from '../Components/NavBottom';

const Admin = () => {
  const [loading, setLoading] = React.useState(true)
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const endpoint = `https://cookit.my-extravaganza.site`

  const [users, setUsers] = useState<any>()

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${endpoint}/users/listverify`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${cookies.user.token}`
        }
      });
      setUsers(response.data.data)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers()
  }, [endpoint]);

  const handleVerify = async (id: number) => {
    try {
      const response = await axios.put(`${endpoint}/users/approval/${id}`,
        {
          status: "verify"
        },
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${cookies.user.token}`
          }
        });
      setUsers(response.data.data)
    } catch (error) {
      console.error(error);
    } finally {
      fetchUsers();
    }
  };

  return (
    <Layout>
      <NavBack
        title='Verify Users'
      />

      {loading ? <LoadingSpinner /> :
        <>
          {users.map((user: any) => {
            return (
              <CardUser
                key={user.id}
                username={user.username}
                profileID={user.id}
                profilePicture={user.profile_picture}
                verifiedUser={user.role === "VerifiedUser"}
                profileBio={""}
              >
                <button className='btn btn-secondary btn-sm btn-circle' onClick={() => handleVerify(user.id)}>
                  <BsCheckLg />
                </button>
              </CardUser>
            )
          })}
        </>}

      <NavBottom />
    </Layout >
  )
}

export default Admin