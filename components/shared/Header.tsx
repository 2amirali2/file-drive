import {
  OrganizationSwitcher,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useSession,
} from "@clerk/nextjs"
import { Button } from "../ui/button"
import Image from "next/image"
import Link from "next/link"

const Header = () => {
  return (
    <div className="border-b py-4 bg-gray-50">
      <div className="container mx-auto justify-between flex items-center">
        <Link href={"/"} className="flex gap-2 items-center text-xl">
          <Image
            src={"/logo.png"}
            alt="file-drive-logo"
            width={50}
            height={50}
          />
          File Drive
        </Link>
        <SignedIn>
          <Button variant={"outline"}>
            <Link href={"/dashboard/files"}>Your Files</Link>
          </Button>
        </SignedIn>
        <div className="flex gap-2">
          <OrganizationSwitcher />
          <UserButton />
          <SignedOut>
            <SignInButton>
              <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </div>
  )
}
export default Header
