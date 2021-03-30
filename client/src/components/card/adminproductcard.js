import React from 'react'
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Card } from 'antd';


const { Meta } = Card;

const AdminProductCard = ({product, removeProduct}) =>{
    // destructure
    const { title, description, images, slug} = product

    return(
        <Card
            style={{ width: 240, height: "150px", objectFit: "cover" }}
            className = 'p-1'
            cover={
                <img alt={title} 
                src= {images && images.length ? images[0].url : " "} 
                />
            }
            actions={[ 
                <Link to = {`/admin/product/${slug}`}>
                    <EditOutlined 
                        className="text-warning" 
                    />
                </Link>  
                ,
                <DeleteOutlined 
                    className="text-danger" 
                    onClick = {() => removeProduct(slug)}
                />
            ]}
        >
            <Meta 
                title={title} 
                description={`${description && description.substring(0, 40)}...`} 
            />
        </Card>
    )
}



export default AdminProductCard