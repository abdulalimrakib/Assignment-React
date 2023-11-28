import Product from "./Product";

const Products = ({Products}) => {
    return (
        <div className="grid grid-cols-3 gap-5">
            {
                Products.map((item, index) => <Product key={index} img={item.image} title={item.title} price={item.price} rating={item.rating.rate} description={item.description}></Product>)
            }
        </div>
    );
};

export default Products;