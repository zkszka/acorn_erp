import React, { useState } from 'react';
import './Vendor.css';
import '../../Main/Main.css';
import VendorAdd from './VendorAdd';
import VendorUpdate from './VendorUpdate';
import NewDatePicker from './DatePicker';
import Modal from './Modal';
import { AiOutlinePrinter } from 'react-icons/ai';
import { PiFileArrowUp } from 'react-icons/pi';

const VendorMgmt = () => {
  const [isAddClicked, setIsAddClicked] = useState(false);
  const [isUpdateClicked, setIsUpdateClicked] = useState(false);
  const [checkAll, setCheckAll] = useState(false);
  const [addVendor, setAddVendor] = useState([
    { vendorCode: 'V001', vendorName: 'A', vendorContact: 'Unit A', vendorAddress: '123-456-789', vendorRemark: '/', deliverableStatus: '가능' },
    { vendorCode: 'V002', vendorName: 'B', vendorContact: 'Unit B', vendorAddress: '111-222-333', vendorRemark: '/', deliverableStatus: '가능' },
  ]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItemIndexes, setSelectedItemIndexes] = useState([]);
  const [updateVendor, setUpdateVendor] = useState(null); // 수정할 항목의 데이터 상태

  const handleCheckAll = () => {
    setCheckAll(!checkAll);
    if (!checkAll) {
      const allVendorCodes = addVendor.map((vendor) => vendor.vendorCode);
      setSelectedItems(allVendorCodes);
      setSelectedItemIndexes(Array.from({ length: addVendor.length }, (_, index) => index));
    } else {
      setSelectedItems([]);
      setSelectedItemIndexes([]);
    }
  };

  const handleSingleCheckChange = (vendorCode, index) => {
    if (selectedItems.includes(vendorCode)) {
      setSelectedItems(selectedItems.filter((item) => item !== vendorCode));
      setSelectedItemIndexes(selectedItemIndexes.filter((item) => item !== index));
    } else {
      setSelectedItems([...selectedItems, vendorCode]);
      setSelectedItemIndexes([...selectedItemIndexes, index]);
    }
  };

  const handleAddClick = () => {
    setIsAddClicked(true);
    setIsUpdateClicked(false);
  };

  const handleUpdateClick = () => {
    if (selectedItems.length === 0) {
      window.alert('수정할 항목을 선택해 주세요.');
    } else if (selectedItems.length > 1) {
      window.alert('하나의 항목만 선택해 주세요.');
    } else {
      const selectedIndex = selectedItemIndexes[0];
      setUpdateVendor(addVendor[selectedIndex]); // 선택된 항목의 데이터를 updateVendor 상태로 설정
      setIsUpdateClicked(true);
      setIsAddClicked(false);
    }
  };

  const handleDeleteClick = () => {
    if (selectedItems.length === 0) {
      window.alert('삭제할 항목을 선택해 주세요.');
    } else {
      if (window.confirm('선택된 항목을 삭제하시겠습니까?')) {
        const remainingItems = addVendor.filter((vendor) => !selectedItems.includes(vendor.vendorCode));
        setAddVendor(remainingItems);
        setSelectedItems([]);
        setSelectedItemIndexes([]);
      }
    }
  };

  const handleAddVendor = (newVendor) => {
    setAddVendor([newVendor, ...addVendor]);
    setIsAddClicked(false);
  };

  const handleUpdateVendor = (updatedVendor, index) => {
    const updatedList = [...addVendor];
    updatedList[index] = updatedVendor;
    setAddVendor(updatedList);
    setIsUpdateClicked(false);
    setSelectedItems([]);
    setSelectedItemIndexes([]);
  };

  const handleCancelUpdate = () => {
    setIsAddClicked(false);
    setIsUpdateClicked(false);
    setSelectedItems([]);
    setSelectedItemIndexes([]);
  };

  return (
    <div>
      <div className="Middle classification">
        <span>
          <h3>
            <b>거래처 관리</b>
          </h3>
        </span>
      </div>

      <hr />

      <div className="subTitle">
        <span>
          {!isUpdateClicked && (
            <>
              {isAddClicked ? (
                <>
                  <button onClick={handleCancelUpdate}>취소</button>
                  <button>기본값</button>
                </>
              ) : (
                <button onClick={handleAddClick}>등록</button>
              )}
              {!isAddClicked && <button onClick={handleUpdateClick}>수정</button>}
              {!isAddClicked && <button onClick={handleDeleteClick}>삭제</button>}
            </>
          )}
          {isUpdateClicked && <button onClick={() => handleUpdateVendor(updateVendor, selectedItemIndexes[0])}>확인</button>}
          {isUpdateClicked && <button onClick={handleCancelUpdate}>취소</button>}
        </span>
      </div>

      <div className="searcher">
        <div className="left">
          <div className="newDatePickerContainer">
            <NewDatePicker className="newDatePicker" selectedDate={startDate} setSelectedDate={setStartDate} />
            <span>-</span>
            <NewDatePicker className="newDatePicker" selectedDate={endDate} setSelectedDate={setEndDate} />
          </div>

          <div className="sorting">
            <select name="vendorSorting">
              <option selected>거래처 코드</option>
              <option>거래처명</option>
              <option>거래처 연락처</option>
            </select>
          </div>
        </div>

        <div className="right">
          <input type="text" placeholder="검색" />
          <button>조회</button>
        </div>
      </div>

      <br />

      <section>
        <div>
          <table className="vendorTable">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" onChange={handleCheckAll} checked={checkAll} />
                </th>
                <th>코드</th>
                <th>거래처명</th>
                <th>거래처 연락처</th>
                <th>거래처 주소</th>
                <th>비고</th>
                <th>납품 가능</th>
              </tr>
            </thead>
            <tbody>
              {addVendor.map((vendor, index) => (
                <tr key={index}>
                  <td>
                    <input type="checkbox" checked={selectedItemIndexes.includes(index)} onChange={() => handleSingleCheckChange(vendor.vendorCode, index)} />
                  </td>
                  <td>{vendor.vendorCode}</td>
                  <td>{vendor.vendorName}</td>
                  <td>{vendor.vendorContact}</td>
                  <td>{vendor.vendorAddress}</td>
                  <td>{vendor.vendorRemark}</td>
                  <td>{vendor.deliverableStatus}</td>
                </tr>
              ))}
              {isAddClicked && (
                <tr>
                  <td colSpan="7">
                    <VendorAdd onAddVendor={handleAddVendor} />
                  </td>
                </tr>
              )}
              {isUpdateClicked && (
                <tr>
                  <td colSpan="7">
                    <VendorUpdate vendorData={updateVendor} onUpdateVendor={handleUpdateVendor} index={selectedItemIndexes[0]} />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default VendorMgmt;
