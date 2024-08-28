import FormLogout from "../formLogout";
import { auth } from "@/utils/auth";
import { getCategories } from "@/libs/prisma";
import LinkList from "./linkList";

const Navbar = async () => {
  const session = await auth();
  const loggedInUser = session?.user;
  const categories = await getCategories();
  return (
    <nav className="bg-white border-gray-200 border-b py-2">
      <LinkList
        user={loggedInUser}
        categories={categories}
        loggedInUser={loggedInUser}
      >
        <FormLogout />
      </LinkList>
    </nav>
  );
};

export default Navbar;
