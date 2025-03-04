import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { alertError } from '../../../util/sweetAlert';

export default function CharityPlan() {
  const { title } = useParams();

  const [charityPlanData, setCharityPlanData] = useState({});
  const getPlanData = async () => {
    try {
      const res = await axios.get(`/products?category=慈善&title=${title}`);
      setCharityPlanData(res.data[0]);
    } catch (error) {
      alertError('取得公益方案失敗');
    }
  };

  useEffect(() => {
    getPlanData();
  }, []);

  return (
    <>
      <section className="charity">
        <div className="container py-6 py-md-18">
          <div className="row justify-content-center text-dark">
            <div className="col-12 col-md-6 px-3 px-md-0">
              {title ? (
                <>
                  <div className="d-flex flex-column align-items-center">
                    <img
                      src={charityPlanData.imageUrl}
                      className="img-fluid rounded-0 mb-6 mb-md-12"
                      alt={charityPlanData.title}
                    />
                    <h2 className="text-primary-800 text-center fs-5 fs-md-2 mb-6 mb-md-10">{charityPlanData.title}</h2>
                    <h4 className="text-primary-700 fs-5 mb-6 mb-md-10">{charityPlanData.description}</h4>
                    <p className="text-dark mb-6 mb-md-10">{charityPlanData.content}</p>
                    <h4 className="text-primary-700 fs-5 mb-6 mb-md-10">小小零錢，大大愛心</h4>
                    <p className="text-primary-600 fs-4 mb-6 mb-md-10">${charityPlanData.price}</p>
                  </div>
                </>
              ) : (
                <p className="text-muted">載入中...</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
