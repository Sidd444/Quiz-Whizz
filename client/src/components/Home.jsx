import React from "react";

const Home = () => {
  return (
    <div className="text-center mt-10">
      <h1 className="text-4xl text-white font-bold mb-5">
        Welcome to Quizz-Whizz
      </h1>
      <p className="text-lg text-white">
        Create and take quizzes to test your knowledge!
      </p>
      <div>
        <div id="main">
          <div id="card1" className="cards">
            <h3 className="text-3xl font-bold mb-10">Check Your Knowledge</h3>
            <p>
              Test yourself with quizzes on various subjects and see how much you know! Sharpen your skills and learn something new every day.
            </p>
          </div>
          <div id="card2" className="cards">
            <h3 className="text-3xl font-bold mb-10">Create Your Own Quiz</h3>
            <p>
              Have fun creating custom quizzes for yourself and your friends. Challenge others and share your knowledge by crafting quizzes on your favorite topics.
            </p>
          </div>
          <div id="card3" className="cards">
            <h3 className="text-3xl font-bold mb-10">
              Take Quizzes Created by Others
            </h3>
            <p>
              Explore quizzes made by other users. From history and science to pop culture and trivia, discover new quizzes and broaden your horizons.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
