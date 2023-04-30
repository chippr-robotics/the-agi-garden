import { h, useContext } from "preact"; 
import { useState, useEffect } from "preact/hooks"; 
import { Entity} from "aframe-react"; 
import WebSocketContext from "../util/WebSocketContext";

const VRScene = () => {
    //ears open
    const socket = useContext(WebSocketContext);

    // Define your state and event handling logic here
    const [nodes, setNodes] = useState([]);

    // Initialize the nodes and event listeners
    useEffect(() => {
        if (socket){
            socket.onmessage = (event) => {
                const message = JSON.parse(event.data);
                if (message.type === 'UPDATE' && message.eventData.componentName === 'TaskDescription'){
                    handleNodeUpdate(nodeID, newData)
                }
            }
        }
    });
        
        // Fetch nodes data, set up event listeners, etc.
        const fetchInitialNodes = async () => {
            const initialNodes = await getInitialNodes();
            setNodes(initialNodes);
        };
        fetchInitialNodes();
        const onNodeUpdate = (event) => {
            const { nodeID, newData } = event.detail;
            handleNodeUpdate(nodeID, newData);
        };

        return () => {
            // Cleanup event listeners when the component is unmounted
        };
    }, []);

    // Handle updates to nodes when events arrive
    const handleNodeUpdate = (nodeId, newData) => {
        // Update the state with the new data for the specified node
        setNodes((prevNodes) => 
            prevNodes.map((node) => {node.id === nodeId? {...node, data: newData} : node;})
        );
    };

    return (
        <Entity>
        {nodes.map((node) => (
            <Entity
                key={node.id}
                geometry={{ primitive: 'box', width: 1, height: 1, depth: 1 }}
                material={{ color: node.color }}
                position={node.position}
                rotation={node.rotation}
                scale={node.scale}
            />
        ))}
        </Entity>
    );
};

export default VRScene;