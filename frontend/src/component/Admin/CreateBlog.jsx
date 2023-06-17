import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createBlog } from "../../actions/BlogActions";
import { Button } from "@material-ui/core";
import MetaData from "../../more/Metadata";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import DiscountIcon from "@material-ui/icons/LocalOffer";
import SideBar from "./Sidebar";
import { NEW_BLOG_RESET } from "../../constans/BlogConstans";
import { ToastContainer, toast } from 'react-toastify';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    //[{ 'font': [] }],
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
    ["clean"],
  ],
};

const formats = [
  //'font',
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "align",
  "color",
  "background",
];
const CreateBlog = ({ history }) => {
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.createBlog);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("");

   const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const categories = [
    "Thịt",
    "Rau",
    "Gia vị",
    "Trái cây",
    "Thực phẩm chế biến"
  ];

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Product Created Successfully");
      history.push("/dashboard");
      dispatch({ type: NEW_BLOG_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createBlogSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("title", title);
    
    myForm.set("description", description);
    myForm.set("category", category);
 
    images.forEach((image) => {
      myForm.append("images", image);
    });

    
    
    dispatch(createBlog(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
  
    setImages([]);
    setImagesPreview([]);
  

    files.forEach((file) => {
      const reader = new FileReader();
        console.log(file)
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
       
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });

  
  }

 
  const handleChange  = (content, delta, source, editor) => {
    console.log(editor.getHTML()); // html 사용시
    // console.log(JSON.stringify(editor.getContents())); // delta 사용시
    setDescription(editor.getHTML());
  };
 
  // const createProductImagesChange = (event) => {
  //   const files = Array.from(event.target.files);
  //   const uploadedImages = [];
  //   for (let i = 0; i < files.length; i++) {
  //     uploadedImages.push(URL.createObjectURL(files[i]));
  //   }
  //   setImages((old) => [...old, ...uploadedImages]);


  // };
  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createBlogSubmitHandler}
          >
            <h1>Thêm Blog mới</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Tên sản phẩm"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
           
       
            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Chọn loại</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
    
                </div>

                <span style={{marginRight:"485px"}}>Chọn ảnh cho sản phẩm </span>
            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
            {imagesPreview.map((image) => (
                <img key={image} src={image} alt="uploaded" />
             ))}
            </div>

       
        
            <div>
                  <ReactQuill
                  
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    value={description}
                    onChange={handleChange}
                  />
          
            </div>

        

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Tạo mới
            </Button>
          </form>
        </div>
      </div>
      <ToastContainer 
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
    </Fragment>
  );
};

export default CreateBlog;