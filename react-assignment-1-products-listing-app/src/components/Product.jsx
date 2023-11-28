
const Product = ({
    img,
    title,
    price,
    rating,
    description
}) => {
    return (
        <article className="bg-gray-500">
            <div>
                <img src={img} alt="" className="w-full h-[500px]" />
                <div className="pt-2 pl-2 ">
                    <h4 className="text-[20px] font-medium">{title}</h4>
                    <p className="text-orange-300 text-[18px]">Price: $ {price}</p>
                    <p className="text-orange-300 text-[18px]">Rating: {rating}/5</p>
                    <p className="text-[18px] font-medium">Description: {description}</p>
                    <button className="bg-white px-2 py-1 rounded-full font-bold my-3 hover:bg-orange-300">Add to cart</button>
                </div>
            </div>
        </article>
    );
};

export default Product;