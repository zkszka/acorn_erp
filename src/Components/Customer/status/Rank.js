// 작성자: 박승희
// 고객현황 데이터 시각화 "고객랭킹차트" 컴포넌트

import * as React from 'react'
import "../../Main/Main.css"
import "../Customer.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

//예제 데이터
const Rank = () => {
    const count = [
        { rank: 1, name: '박승희', count: 2000, prod: '소세지빵', prevRank: 2 },
        { rank: 2, name: '김철수', count: 18, prod: '피자빵', prevRank: 1 },
        { rank: 3, name: '이영희', count: 16, prod: '케이크', prevRank: 3 },
        { rank: 4, name: '최민수', count: 15, prod: '도넛', prevRank: 4 },
        { rank: 5, name: '정수연', count: 14, prod: '샌드위치', prevRank: 6 },
        { rank: 6, name: '한지민', count: 13, prod: '머핀', prevRank: 5 },
        { rank: 7, name: '박지훈', count: 12, prod: '크로와상', prevRank: 8 },
        { rank: 8, name: '김지수', count: 11, prod: '베이글', prevRank: 7 },
        { rank: 9, name: '이지은', count: 10, prod: '도넛', prevRank: 11 },
        { rank: 10, name: '김민주', count: 9, prod: '샌드위치', prevRank: 9 },
    ];
    const amount = [
        { rank: 1, name: '송지환', amount: 1000000, prod: '피자빵', prevRank: 2 },
        { rank: 2, name: '이영수', amount: 900000, prod: '햄버거', prevRank: 1 },
        { rank: 3, name: '박민수', amount: 800000, prod: '케이크', prevRank: 4 },
        { rank: 4, name: '김지수', amount: 700000, prod: '도넛', prevRank: 3 },
        { rank: 5, name: '정현수', amount: 600000, prod: '샌드위치', prevRank: 6 },
        { rank: 6, name: '최유진', amount: 500000, prod: '머핀', prevRank: 5 },
        { rank: 7, name: '최승희', amount: 400000, prod: '크로와상', prevRank: 8 },
        { rank: 8, name: '김지현', amount: 300000, prod: '베이글', prevRank: 7 },
        { rank: 9, name: '이지아', amount: 200000, prod: '도넛', prevRank: 11 },
        { rank: 10, name: '박민준', amount: 100000, prod: '샌드위치', prevRank: '' },
    ];
    //전월 대비 랭킹 변동사항 확인
    //변동사항 특이사항으로 저장하기
    const getRankChange = (rank, prevRank) => {
        if (prevRank === null || prevRank === undefined|| prevRank>10) {
            return { icon: <span className="badge text-bg-success">New</span>, text: '' }; // new
        }
        if (rank < prevRank) {
            return { icon: <FontAwesomeIcon icon={faCaretUp} style={{ color: 'blue' }}/>, text: ` ${Math.abs(prevRank - rank)}` }; // 상승
        }
        if (rank > prevRank) {
            return { icon: <FontAwesomeIcon icon={faCaretDown} style={{ color: 'red' }}/>, text: ` ${Math.abs(prevRank - rank)}` }; // 하락
        }
        return { icon: "-", text: '' }; // 동일
    };
    const formatNumber = (num) => {
        return num.toLocaleString();
    };
    const renderCustomers = (customers, type) => {
        return customers.map((customer, index) => {
            
            const rankChange = getRankChange(customer.rank, customer.prevRank);
            return(
            <tr key={index}>
                <td className="table-centered rank ">{customer.rank}</td>
                <td className="table-righted name"><a href="">{customer.name}</a></td>
                <td className="table-lefted">
                        {rankChange.icon}&nbsp; 
                        {rankChange.text && <span> {rankChange.text}</span>}
                    </td>
                <td className="table-righted">{formatNumber(type === 'count' ? customer.count : customer.amount)}</td>
                <td className="table-centered prod">{customer.prod}</td>
            </tr>
            );
        });
    };
    
    // const createRemarkCustomerRanking =()=>{
    //     if(prevRank === null || prevRank === undefined|| prevRank>10){
    //         const msg = "최다거래고객 || 최고매출고객 랭킹에 진입하였습니다.";
    //     }
    //     else{
    //         msg = "{}월 최다거래고객 || 최고매출고객 랭킹에서  {}위 고객입니다.";
    //     }
    //     return create(msg);
    // }

    return (
        <div className="c_rank">
            <section>
                {/* <!-- 고객구매실적 --> */}
                <div className="row" style={{ margin: "auto" }}>
                    {/* 최다 거래 고객 랭킹 */}
                    <div className="col-md-6 col-lg-6" style={{ marginTop: "10px" }}>
                        <div className="app-card app-card-stats-table h-100 shadow-sm" style={{ backgroundColor: 'white', marginTop: '30px' }}>
                            <div className="app-card-header p-3 title" style={{ marginBottom: "-20px" }}>
                                <h3 className="app-card-title">최고 매출 고객 랭킹</h3>
                            </div>
                            <div className="app-card-body p-3 p-lg-4  content">
                                <table className="table table-hover" style={{ wordBreak: "breakAll" }}>
                                    <thead >
                                        <tr >
                                            <th className="table-centered">랭킹</th>
                                            <th className="table-centered" colSpan="2">고객명</th>
                                            <th className="table-centered">총 매출 금액(원)</th>
                                            <th className="table-centered">최고매출상품</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {renderCustomers(amount, 'amount')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {/* 최고 매출 고객 랭킹 */}
                    <div className="col-md-6 col-lg-6" style={{ marginTop: "10px" }}>
                        <div className="app-card app-card-stats-table h-100 shadow-sm" style={{ backgroundColor: 'white', marginTop: '30px' }}>
                            <div className="app-card-header p-3 title" style={{ marginBottom: "-20px" }}>
                                <h3 className="app-card-title">최다 거래 고객 랭킹</h3>
                            </div>
                            <div className="app-card-body p-3 p-lg-4 content">
                                <table className="table table-hover" style={{ wordBreak: "breakAll" }}>
                                    <thead>
                                        <tr>
                                            <th className="table-centered">랭킹</th>
                                            <th className="table-centered" colSpan="2">고객명</th>
                                            <th className="table-centered">총 거래 횟수(회)</th>
                                            <th className="table-centered">최다거래상품</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {renderCustomers(count, 'count')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Rank;