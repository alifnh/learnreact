import React, { useContext, useState } from "react";
import { Typography, Card, Col, Row} from 'antd';
import { AppContext, AppProvider } from "../AppContext";
import { ContactsOutlined } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";

const { Meta } = Card;
const Home = () => {
   const {dataFilm, dataGame} = useContext(AppContext);
   const history = useHistory();

   const handleClickM = (e) => {
      history.push(`/movie/${e}`);
   }

   const handleClickG = (e) => {
      history.push(`/game/${e}`);
   }
      return (
         <>
         <Typography level={1} style={{fontSize: 40, textAlign: "center", fontFamily: "fantasy"}}>Game & Movie Reviews
         </Typography>
         <br />
         <Typography level={2} style={{fontSize: 30}}>List Film
         </Typography>
         <div className="site-card-wrapper">
         <Row gutter={16}>
         {dataFilm !== null &&
         dataFilm.map((film)=>{
            return (
               <Col span={8}>
               <div onClick={() => handleClickM(film.id)}>
               <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={<img src={film.image_url} />}
               >
               <Meta title={film.title} description={film.genre} />
               </Card>
               </div>   
               </Col>
                  )
               })}
         </Row>
         <br />
         <br />
         </div>
         <Typography level={2} style={{fontSize: 30}}>List Game
         </Typography>
         <div className="site-card-wrapper">
         <Row gutter={16}>
         {dataGame !== null &&
         dataGame.map((game)=>{
            return (
               <Col span={8}>
               <div onClick={() => handleClickG(game.id)}>
               <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={<img src={game.image_url} />}
               >
                  <Meta title={game.name} description={game.genre} />
               </Card>
               </div>
               </Col>
                  )
               })}
         </Row>
         </div>
         
         </>
       );
}

export default Home;