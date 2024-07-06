import React from 'react';
import SearchModule from '../modules/SearchModule';
import PeriodSearchButtonModule from '../modules/PeriodSearchModule';
import SearchButtonModule from '../modules/SearchButtonModule';
import DropdownModule from '../modules/DropdownModule';
import DeleteModalModule from '../modules/DeleteModalModule';
import EditRowsSelectAlertModal from './Modal/EditRowsSelectAlertModal';


const Mgmtmenu = ({
    data,
    setRowsPerPage, 
    editingRowId, setEditingRowId,
    onUpdateMode, setOnUpdateMode, onAddMode, setOnAddMode,
    handleSaveClick, handleAddClick,
    handleDeleteClick,
    selectedRows, setEditingRowData, 
    showModal_deleteCheck, setShowModal_deleteCheck,
    showModal_editRowsSelectAlert, setShowModal_editRowsSelectAlert,
    isAnyRowSelected,
    searchKeyword, setSearchKeyword 
}) => {
    const [period, setPeriod] = React.useState({});

    const [modalData_deleteCheck, setModalData_deleteCheck] = React.useState({});
    const [modalData_editRowsSelectAlert, setModalData_editRowsSelectAlert] = React.useState({});
    
    
    const [selectedOption_dropdown, setSelectedOption_dropdown] = React.useState('10줄 보기');

    const handleSelect_dropdown = (option) => {
        setSelectedOption_dropdown(option);
        const newRowsPerPage = Number(option.replace('줄 보기', ''));
        setRowsPerPage(newRowsPerPage);
        localStorage.setItem('CusMgmtRowsPerPage', newRowsPerPage);
    }

    const dropdownData = ['10줄 보기', '20줄 보기', '30줄 보기', '40줄 보기', '50줄 보기'];

    const handleDeletebuttonClick = (rowData) => {
        setModalData_deleteCheck(rowData);
        setShowModal_deleteCheck(true);
    };
    const handleEditModeClick = () => {
        const selectedCustomerIds = Object.keys(selectedRows).filter(customerId => selectedRows[customerId]);

        if (selectedCustomerIds.length === 1) {
            setEditingRowId(selectedCustomerIds[0]); // 첫 번째 선택된 ID를 설정
            const rowData = data.find(row => row.customerId.toString() === selectedCustomerIds[0].toString());
            if (rowData) {
                setEditingRowData(rowData); // editingRowData를 올바르게 설정
                setOnUpdateMode(true);
            } else {
                console.log("Selected row data not found");
            }
        }else {
            setShowModal_editRowsSelectAlert(true)
        }
    }

    const handleAddModeClick = () => {
        setOnAddMode(true);
    };

    const handleCloseClick = () => {
        setOnAddMode(false);
        setOnUpdateMode(false);
    };
    const handleSearchChange = (e) => {
        setSearchKeyword(e.target.value);
      };
    const onSearch = () => {
        setOnAddMode(true);
    };
    return (
        <div>
            <div className='items-subTitle righted'>
                <span>
                    {!onUpdateMode && isAnyRowSelected ? (
                        <>
                            <button onClick={handleEditModeClick}>수정</button>
                            <button onClick={handleDeletebuttonClick}>삭제</button>
                        </>
                    ) : null}
                    {onUpdateMode && isAnyRowSelected ? (
                        <>
                            <button onClick={() => handleSaveClick(data.customerId)}>수정 확인</button>
                            <button onClick={handleCloseClick}>취소</button>
                        </>
                    ) :
                        null
                    }
                    {onAddMode && !isAnyRowSelected ? (
                        <>
                            <button onClick={handleAddClick}> 등록 확인</button>
                            <button onClick={handleCloseClick}>취소</button>
                        </>
                    ) : null
                    }
                    {!onAddMode && !onUpdateMode && !isAnyRowSelected ? (
                        <button onClick={handleAddModeClick}>등록</button>
                    ) : null}
                </span>
            </div>
            <PeriodSearchButtonModule setPeriod={setPeriod} />

            <div className='row'>
                <div className='col-1'>
                    <DropdownModule
                        selectedOption={selectedOption_dropdown}
                        handleSelect={handleSelect_dropdown}
                        options={dropdownData}
                    />
                </div>
                <div className='col-10 righted' style={{ margin: '0' }} >
                    <SearchModule
                       value={searchKeyword}
                       onChange={handleSearchChange}
                    />
                </div>
                <div className='col-1'>
                    <SearchButtonModule 
                       value={searchKeyword}
                       onChange={handleSearchChange}
                    />
                </div>
            </div>

            {showModal_deleteCheck && (
                <DeleteModalModule
                    show={showModal_deleteCheck}
                    onHide={() => setShowModal_deleteCheck(false)}
                    // data={modalData_deleteCheck}
                    handleDeleteClick={handleDeleteClick}
                />
            )}
            {showModal_editRowsSelectAlert && (
                <EditRowsSelectAlertModal
                    show={showModal_editRowsSelectAlert}
                    onHide={() => setShowModal_editRowsSelectAlert(false)}
                    // data={modalData_editRowsSelectAlert}
                />
            )}
        </div>
    );
};

export default Mgmtmenu;
