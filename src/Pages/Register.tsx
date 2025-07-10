
import { SignUp } from "../Components/Account/SignUp"
import { Container } from "../Components/Container"
import { Footer } from "../Components/Footer"
import { Navbar } from "../Components/Navbar"

export const Register = () => {
  return (
    <>
      <Container className="bg-gradient-to-br from-[#888372] via-[#83857d] to-[#443a1f]">
      <Navbar/>
      <SignUp/>
      <Footer/>
      </Container>
    </>
  )
}
