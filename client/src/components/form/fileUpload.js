import React from "react";
import Resizer from "react-image-file-resizer"
import { Badge, Avatar } from "antd"
import { useSelector} from 'react-redux'
import  axios from "axios"
const url = 'http://localhost:9000/api'


const FileUpload = ({ values, setValues, setLoading}) => {

    const { user } = useSelector((state) => ({...state}))

  const fileUploadAndResize = (e) => {
    // console.log(e.target.files);

        // resize
        let files = e.target.files; 
        let allUploadedFiles = values.images;

        if (files) {
            setLoading(true)
            for (let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(
                files[i],
                720,
                720,
                "JPEG",
                100,
                0,
                (uri) => {
                    // console.log("files>>>>>>>",uri);
                    axios
                        .post(`${url}/uploadimages`, 
                        { image: uri },    
                        {
                            headers: {
                                authtoken: user ? user.token : " "
                            },
                        }
                    )
                    .then((res)=>{
                        console.log('img response>>>', res)
                        setLoading(false)
                        allUploadedFiles.push(res.data)
                        setValues({ ...values, images:allUploadedFiles })
                    })
                    .catch((err)=>{
                        setLoading(false);
                        console.log("CLOUDINARY UPLOAD ERR", err);
                    })
                },
                "base64"
                );
            }
        }
        // send back to server to upload to cloudinary
        // set url to images[] in the parent component state - ProductCreate
    };
    const handleRemoveImage = (public_id) => {
      setLoading(true);
          // console.log("remove image", public_id);

      axios
      .post(`${url}/deleteimages`, {public_id},
        {
          headers: {
            authtoken: user ? user.token : ""
          },
        }
      )
      .then((res) =>{
        setLoading(false);
        const { images } = values
        let filteredimages = images.filter((item)=>{
          return item.public_id !== public_id;        
        })
        setValues({ ...values, images:filteredimages })
      })
      .catch((err)=>{
        console.log(err);
        setLoading(false);
      })
    }

    return (
      <>
        <div className = "row">
          {values.images && values.images.map((image)=>(
            <Badge
              count = "X"
              key={image.public_id} 
              style={{ cursor: "pointer" }}
              onClick = {() => handleRemoveImage(image.public_id)}
              
            >
                <Avatar 
                  shape = "square"
                  src={image.url} size= {100} 
                  className = "ml-3" />
            </Badge>
          ))}
        </div>

        <div className="row">
            <label className="btn btn-primary  btn-raised mt-3">
            Choose File
            <input
                type="file"
                multiple
                hidden
                accept="images/*"
                onChange={fileUploadAndResize}
            />
            </label>
        </div>
      </>
    );
};
  
export default FileUpload;

