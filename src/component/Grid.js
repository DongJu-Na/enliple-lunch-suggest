import React, { useCallback, useEffect, useState } from "react";

import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';
import Button from '@inovua/reactdatagrid-community/packages/Button'

import axios from "axios";
import Swal from "sweetalert2";

function Grid({data}) {
    const [selected, setSelected] = useState({});
    

    useEffect(()=>{

    },[])

    const addItem = () => {

    }

    const delItem = () => {

    }

    const onSelectionChange = useCallback(({ selected }) => {
        setSelected(selected)
      }, []);


    
    const columns = [
        { name: 'name', header: '상호명', minWidth: 50, defaultFlex: 2 },
        { name: 'paycoYn', header: 'PAYCO', maxWidth: 1000, defaultFlex: 1 ,  textAlign : "center"},
      ];
      
        const gridStyle = { minHeight: 550 };
      
    return (
        <div>
            <Button onClick={() => addItem()} style={{ marginBottom : 10 }}>
                식당 추가
            </Button>

            <Button onClick={() => delItem()}  style={{ marginBottom : 10 , marginLeft : 10 }}>
                식당 삭제
            </Button>

            <ReactDataGrid
                idProperty="id"
                columns={columns}
                dataSource={data}
                style={gridStyle}
                checkboxColumn={true}
                onSelectionChange={onSelectionChange}
            />
        </div>
    )
}

export default Grid;