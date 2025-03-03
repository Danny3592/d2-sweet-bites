import charityCorner from '../../assets/images/index-charity/corner.png';
import charityPlanKid from '../../assets/images/index-charity/donation01_kids.png';
import charityPlanPet from '../../assets/images/index-charity/donation02_pets.png';
import charityPlanTrees from '../../assets/images/index-charity/donation03_trees.png';
import charitySchoolIcon from '../../assets/images/index-charity/school.png';
import charityDogIcon from '../../assets/images/index-charity/dog.png';
import charityPlantIcon from '../../assets/images/index-charity/plant.png';
import userDefault from '../../assets/images/layout/user-circle.svg';
import { Link } from 'react-router-dom';

export default function Charity() {
  const thanksMessages = [
    {
      name: 'Chung',
      avatar: '',
      message:
        '第一次知道買甜點也能做公益，能幫助需要幫助的孩子，感覺特別幸福！',
    },
    {
      name: 'Joy',
      avatar: '',
      message:
        '希望這些捐款可以為更多流浪貓狗帶來溫暖，牠們的生命也值得被善待。',
    },
    {
      name: 'Danny',
      avatar: '',
      message: '在忙碌生活中，甜點就是我的小確幸，希望能分享這份幸福！',
    },
    {
      name: 'Tim',
      avatar: '',
      message:
        '支持特色希望專案！種下一棵樹就是種下對地球的承諾，為未來盡一份力。',
    },
  ];

  return (
    <>
      <section className="charity">
        <div className="charity-title position-relative py-6 pt-md-10">
          <div className="container text-center ">
            <h2 className="fs-6 fs-md-2 mb-6 text-primary-800">
              在幸享屋，讓甜點成為幸福的連結
            </h2>
            <p className="text-gray-800 fs-8 fs-md-7 mb-6 ">
              購買甜點，選擇捐款
              <br />
              與幸享屋一起改變世界、傳遞幸福。
            </p>
            <p className="text-gray-800 fs-8">點選公益方案了解更多</p>
            <img
              src={charityCorner}
              alt="corner"
              className="position-absolute top-100 start-50 translate-middle-x"
            />
          </div>
        </div>
        <ul className="d-flex flex-column flex-md-row py-12 py-md-24 list-unstyled px-0">
          <li className="charity-plan position-relative mb-2 mb-md-0 me-md-2">
            <Link to='/charity/甜蜜助學計畫'>
              <img
                className="w-100 h-100 object-fit-cover"
                src={charityPlanKid}
                alt=""
              />
              <div className="charity-plan-content position-absolute top-50 start-50 translate-middle text-white text-center z-1">
                <img src={charitySchoolIcon} alt="" />
                <h3>甜蜜助學計畫</h3>
                <p>捐助營養餐</p>
              </div>
            </Link>
          </li>
          <li className="charity-plan position-relative mb-2 mb-md-0 me-md-2">
            <Link to='/charity/幸福愛寵行動'>
              <img
                className="w-100 h-100 object-fit-cover"
                src={charityPlanPet}
                alt=""
              />
              <div className="charity-plan-content position-absolute top-50 start-50 translate-middle text-white text-center z-1">
                <img src={charityDogIcon} alt="" />
                <h3>幸福愛寵行動</h3>
                <p>捐助罐罐</p>
              </div>
            </Link>
          </li>
          <li className="charity-plan position-relative">
            <Link to='/charity/綠色希望專案'>
              <img
                className="w-100 h-100 object-fit-cover"
                src={charityPlanTrees}
                alt=""
              />
              <div className="charity-plan-content position-absolute top-50 start-50 translate-middle text-white text-center z-1">
                <img src={charityPlantIcon} alt="" />
                <h3>綠色希望專案</h3>
                <p>保護環境永續</p>
              </div>
            </Link>
          </li>
        </ul>
      </section>
      <section className="thanks">
        <div className="thanks-title text-center container text-white pt-18 pt-lg-36">
          <h2 className="fs-3 fs-lg-2 mb-6 mb-lg-4">愛心留言牆</h2>
          <p className="fs-8 fs-lg-7">
            在幸享屋，每一份愛心都值得被看見，因為有您，幸福在延續。
          </p>
        </div>
        <div className="container mt-12 mt-lg-40">
          <ul className="list-unstyled row flex-md-row g-4 flex-column">
            {thanksMessages.map((message) => (
              <li className="col-lg-6">
                <div className="d-flex align-items-center bg-white rounded-4 p-4" style={{ height: 150 }}>
                  <img
                    className="me-2 rounded-circle object-fit-cover"
                    src={message.avatar ? message.avatar : userDefault}
                    style={{ width: 50, height: 50 }}
                    alt="avatar"
                  />
                  <strong className="fs-7 fs-md-5 me-4">{message.name}</strong>
                  <p>{message.message}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
