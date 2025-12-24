import Header from './components/Header'
import Hero from './components/Hero'
import Carousel from './components/Carousel'
import Benefits from './components/Benefits'
import Steps from './components/Steps'
import Team from './components/Team'
import CallToAction from './components/CallToAction'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-eggshell">
      <Header />
      <main>
        <Hero />
        <Carousel />
        <Benefits />
        <Steps />
        <CallToAction />
        <Team />
      </main>
      <Footer />
    </div>
  )
}

export default App

