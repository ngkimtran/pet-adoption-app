import { useRecoilState } from "recoil";
import { userState } from "../../states/state";
import User from "../../components/User/User";
import Admin from "../../components/Admin/Admin";

const Profile = () => {
  const [user] = useRecoilState(userState);

  if (user?.role === "USER") return <User />;
  if (user?.role === "ADMIN") return <Admin />;

  return (
    <div
      className="alert alert-danger p-4 fw-semibold text-center"
      role="alert"
    >
      Something went wrong - please try again.
    </div>
  );
};

export default Profile;
