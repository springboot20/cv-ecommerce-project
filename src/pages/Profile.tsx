import ProfileForm from './components/profile/ProfileForm';
import SideNav from './components/Navbar/SideNav';
import MainNav from './components/Navbar/MainNav';

const Profile = () => {
  return (
    <>
      <MainNav />
      <section className='mt-24 flex flex-col gap-32'>
        <SideNav />
        <ProfileForm />
      </section>
    </>
  );
};

export default Profile;
