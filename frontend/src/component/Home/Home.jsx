import React, { useEffect } from "react";
import "./Home.css";
import Carousel from "react-material-ui-carousel";
import ProductCard from "../Products/ProductCard";
import  {useDispatch, useSelector} from "react-redux"
import { clearErrors, getProduct } from "../../actions/ProductActions";
import Header from "./Header";
import MetaData from "../../more/Metadata";
import Footer from "../../Footer";
import BottomTab from "../../more/BottomTab";
import Loading from "../../more/Loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const dispatch = useDispatch();
  const { products,error,loading } = useSelector(
    (state) => state.products
  );

   useEffect(() => {
    if(error){ 
      toast.error(error);
      dispatch(clearErrors());
 }
  dispatch(getProduct());
   }, [dispatch,error])
   
  return (
    <>
   
      <>
      <MetaData title="Home" />
      <Header />
        {/* Carousel */}
        <div className="banner">
               <Carousel>
                 <img src="http://www.canfitpro.com/wp-content/uploads/2020/11/eat-clean-foundations.jpg"         
                 className="bgImg"/>
                 <img src="https://cleanfoodcrush.com/wp-content/uploads/2018/01/20-Clean-Eating-Benefits.jpg" 
                 className="bgImg"/>
               </Carousel>
             <div className="home__content">
               <div style={{
                 display:"flex",
                 alignItems:"center",
               }}>
               {/* <h2 style={{
                 fontFamily: "Segoe Script",
                 fontSize: "3em",
                 fontWeight:"500"
               }}>Mua 2 </h2> */}
               {/* <span style={{
                 padding:"10px",
                 backgroundColor:"#fff",
                 margin:"0px 10px",
                 textAlign:"center",
                 width:"150px",
                 height:"40px",
                 color: "#26c",
                 fontFamily: "Segoe Script",
                 fontSize: "2.4em",
                 display:"flex",
                 justifyContent:"center",
                 lineHeight:".7",
                 alignItems:"center"
               }}> free ship</span> */}
               </div>
               <div>
                 <h2 style={{
                   fontSize:"4.5em",
                   fontFamily:"Poppins,sans-serif",
                   color:"#fff",
                 }}>Sống xanh</h2>
               </div>
               {/* <div>
                 <h2 style={{
                   fontSize:"4.5em",
                   fontWeight:"400",
                   fontFamily:"Poppins,sans-serif",
                   color:"#fff",
                   lineHeight:".7"
                 }}>Collection</h2>
               </div> */}
               <div>
                 <h2
                 style={{
                   fontWeight:"400",
                   fontFamily:"Poppins,sans-serif",
                   color:"#fff",
                   fontSize:"1em",
                   paddingTop:"10px"
                 }}
                 >
                Miễn phí ship với đơn hàng trên 200.000đ
                 </h2>
               </div>
               <div>
                 <a href="#container">
                 <button type="submit" style={{
                   width:"165px",
                   height:"50px",
                   border:"none",
                   background:"#3BB77E",
                   margin:"10px 0",
                   fontSize:"1.2vmax",
                   color:"#fff",
                   cursor:"pointer"
                 }}
                 className="Home__button"
                 >Đặt hàng</button>
                 </a>
               </div>
             </div>
         </div>
 
       <div className="advertise" >

          <div  className="icon">
          <a href="" ><img style={{width:"100px"}} src="https://cdn-icons-png.flaticon.com/512/616/616742.png" alt="" /></a>
          </div>
          <div className="section2">
                <h3>Quy trình thuận tự nhiên</h3>
                <p>Thuận tự nhiên là tôn chỉ của chúng tôi trong quá trình chăn nuôi, trồng cấy các sản phẩm để cung cấp đến người tiêu dung.</p>

             
          </div>
         
          
          <div  className="icon">
          <a href="" ><img style={{width:"100px"}} src="https://static.vecteezy.com/system/resources/previews/006/606/853/original/farmer-avatar-icon-agriculture-line-style-free-free-vector.jpg" alt="" /></a>
          </div>
          <div className="section2">
                <h3>Chuỗi cung ứng tiêu chuẩn</h3>
                <p>Bộ phận kỹ sư thực địa luôn giám sát nghiêm ngặt đối với các Hợp tác xã , đối tác tham gia trong chuỗi cung ứng tiêu chuẩn của chúng tôi.</p>
          </div>


          <div  className="icon">
          <a href="" ><img style={{width:"95px"}} src="https://bactom.com/wp-content/uploads/2022/05/banner3.png" alt="" /></a>
          </div>
          <div className="section2">
                <h3>Nguồn gốc minh bạch</h3>
                <p>Sản phẩm thuận tự nhiên phải có thông tin nguồn gốc, quá trình nuôi trồng, sản phẩm được công khai minh bạch theo thời gian thực trên từng sản phẩm.</p>
          </div>


       </div>
      <h2 className="homeHeading">Thịt các loại </h2>
      <div className="container" id="container">
        {products &&
        
        products
        .filter((product) => product.category === 'Thịt' && product.status=="Chưa thanh lý")
        .map((product) =>(
          <ProductCard key={product._id} product={product} />
        ))}
      </div>


      <h2 className="homeHeading">Trái cây tươi ngon</h2>
      <div className="container" id="container">
        {products &&
        
        products
        .filter((product) => product.category === 'Trái cây' && product.status==="Chưa thanh lý")
        .map((product) =>(
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <h2 className="homeHeading">Gia vị</h2>
      <div className="container" id="container">
        {products &&
        
        products
        .filter((product) => product.category === 'Gia vị' && product.status==="Chưa thanh lý")
        .map((product) =>(
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <ToastContainer 
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
      <Footer />
      <BottomTab />
      </>    
  
    </>
  );
};

export default Home;
