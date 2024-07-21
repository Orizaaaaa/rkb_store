
import Header from '../../components/fragments/home/Header'
import Hero from '../../components/fragments/home/Hero'
import Categories from '../../components/fragments/home/Kategori'
import TimeLine from '../../components/fragments/home/Timeline'
import Footer from '../../components/fragments/home/Footer'



const Home = () => {
    return (
        <>
            <Header />
            <Hero />
            <section id="alurAduan">
                <TimeLine />
            </section>
            <section id="kategori">
                <Categories />
            </section>
            <Footer />
        </>
    )
}

export default Home