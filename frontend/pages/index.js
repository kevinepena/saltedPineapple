import Items from '../components/Items';

const Home = props => (
    <div>
        <header className="hero">
            <div className="paral">
                {/* <img src="../static/pics/water2.jpg" /> */}
                <div className="salt">
                    <p>Explore Accesories</p>
                    {/* <p>Shop Sweet</p> */}
                    {/* <p>Shop Salty</p> */}
                    {/* <p></p> */}
                    {/* Shop a little Salty */}
                </div>
            </div>
        </header>
        <Items page={parseFloat(props.query.page) || 1} />
    </div>
)

export default Home;