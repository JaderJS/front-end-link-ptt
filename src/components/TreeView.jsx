import React, { useRef, useEffect } from 'react';
import { Tree } from 'react-d3-tree'
import { tree as d3Tree } from 'd3'
import "../styles/treeview.css"

const TreeView = () => {


    const data = {
        name: 'Master',
        children: [
            {
                name: 'Gerente de Departamento',
                children: [
                    { name: 'slave 1' },
                    { name: 'slave 2' },
                    { name: 'slave 3' },
                    { name: 'slave 4' },
                    { name: 'slave 5' },
                    { name: 'slave 6' },
                ],
            },
        ],
    };


    return (
        <div id="treeWrapper" style={{ width: '100%', height: '500px' }}>
            <Tree
                data={data}
                orientation='vertical'
                pathFunc='step'
                rootNodeClassName="node__root"
                branchNodeClassName="node__branch"
                leafNodeClassName="node__leaf"
            />
        </div>
    )
}

export default TreeView