// 작성자: 박승희
// 고객현황 데이터 페이지 기간선택 및 검색버튼 컴포넌트
import * as React from 'react'
import "../../Main/Main.css"
import {Button} from 'react-bootstrap';

const SearchButtonModule = ({ onSearch }) => {
  
  return (
      <span>
        <Button type="submit" value="조회" className="btn btn-dark" onClick={ onSearch } >조회</Button>
      </span>
  );
}

export default SearchButtonModule;