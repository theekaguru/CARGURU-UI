

import { SignIn } from "../Components/Account/SignIn"
import { Container } from "../Components/Container"
import { Footer } from "../Components/Footer"
import { Navbar } from "../Components/Navbar"

export const Login = () => {
  return (
    <>
      <Container className="bg-gradient-to-br from-[#888372] via-[#a3a4a1] to-[#160d0b]">
      <Navbar/>
      <SignIn/>
      <Footer/>
      </Container>
    </>
  )
}
