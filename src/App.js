import { useEffect, useRef, useState } from "react";

const FREE = "free";
const STRAIGHT = "straight";

export default function App() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [bolderWith, setBolderWith] = useState(1);
  const [type, setType] = useState(STRAIGHT); // free | straight
  /** canvas ref가 잡히는지 안잡히는지 알려주는 함수 */
  const checkCanvasRef = () => {
    if (!canvasRef.current) {
      console.log(canvasRef.current);
      return {
        result: false,
      };
    }
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect(); //터치 스크린
    return { result: true, canvas, ctx, rect };
  };

  useEffect(() => {
    const { result, ...data } = checkCanvasRef();
    if (!result) {
      return;
    }
    const { ctx } = data;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  /** canvas에서 마우스 클릭시 */
  function drawStart(e) {
    const { result, ...data } = checkCanvasRef();
    if (!result) {
      return;
    }

    const { ctx } = data;
    ctx.beginPath();
    setIsDrawing(true);
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    return;
  }
  // function touchStart(e) {
  //   const { result, ...data } = checkCanvasRef();
  //   if (!result) {
  //     console.log("No");
  //     return;
  //   }
  //   console.log("yes");
  //   const { ctx, rect } = data;
  //   ctx.beginPath();
  //   const x = e.touches[0].pageX - rect.left;
  //   const y = e.touches[0].pageY - rect.top;
  //   setIsDrawing(true)
  //   ctx.moveTo(x, y);
  // }
  function draw(e) {
    const { result, ...data } = checkCanvasRef();
    if (!result || !isDrawing) {
      return;
    }
    const { ctx } = data;
    if (type === STRAIGHT) {
      ctx.stroke();
      return;
    }
    if (type === FREE) {
      const x = e.nativeEvent.offsetX;
      const y = e.nativeEvent.offsetY;
      ctx.lineTo(x, y); //하위 경로를 추가하여 연속성을 부여해줌
      ctx.stroke();
      return;
    }
  }
  // function touch(e) {
  //   const { result, ...data } = checkCanvasRef();
  // if (!result || !isDrawing) {
  //     return;
  //   }
  //   const { ctx, rect } = data;
  //   const x = e.touches[0].pageX - rect.left;
  //   const y = e.touches[0].pageY - rect.top;
  //   console.log(x, y);
  //   ctx.lineTo(x, y);
  //   ctx.stroke();
  // }

  function drawEnd(e) {
    const { result, ...data } = checkCanvasRef();
    if (!result || !isDrawing) {
      return;
    }
    const { ctx } = data;
    if (type === FREE) {
      setIsDrawing(false);
    }
    if (type === STRAIGHT) {
      ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY); //하위 경로를 마지막에 추가함으로써 선의 유연성을 없앰: 직선
      ctx.stroke(); //하위 경로 추가 했으니 그리기
      setIsDrawing(false);
    }
  }

  /** 전체 지우기 */
  const clearAll = () => {
    const { result, ...data } = checkCanvasRef();
    if (!result) {
      return;
    }
    const { ctx, canvas } = data;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
  /** 색 변경 */
  function colorChange(color) {
    const { result, ...data } = checkCanvasRef();
    if (!result) {
      return;
    }
    const { ctx } = data;
    ctx.strokeStyle = color;
  }

  /** 펜 사이즈 크기 조절 */
  const onChangeHandler = (e) => {
    const { result, ...data } = checkCanvasRef();
    if (!result) {
      return;
    }
    const { ctx } = data;
    ctx.lineWidth = e.target.value;
    setBolderWith(e.target.value);
  };

  return (
    <div>
      <div>
        브러쉬 크기
        <input
          id="input"
          type="number"
          min="0"
          max="100"
          value={bolderWith}
          onChange={onChangeHandler}
        ></input>
        <button
          onClick={() => colorChange("black")}
          style={{
            backgroundColor: "black",
            width: "20px",
            height: "20px",
            border: "solid 1px",
          }}
        ></button>
        <button
          onClick={() => colorChange("blue")}
          style={{
            backgroundColor: "blue",
            width: "20px",
            height: "20px",
            border: "solid 1px",
          }}
        ></button>
        <button
          onClick={() => colorChange("red")}
          style={{
            backgroundColor: "red",
            width: "20px",
            height: "20px",
            border: "solid 1px",
          }}
        ></button>
        <button
          onClick={() => colorChange("green")}
          style={{
            backgroundColor: "green",
            width: "20px",
            height: "20px",
            border: "solid 1px",
          }}
        ></button>
        <button
          onClick={() => colorChange("pink")}
          style={{
            backgroundColor: "pink",
            width: "20px",
            height: "20px",
            border: "solid 1px",
          }}
        ></button>
        <button
          onClick={() => colorChange("yellow")}
          style={{
            backgroundColor: "skyblue",
            width: "20px",
            height: "20px",
            border: "solid 1px",
          }}
        ></button>
        <button
          onClick={() => colorChange("skyblue")}
          style={{
            backgroundColor: "skyblue",
            width: "20px",
            height: "20px",
            border: "solid 1px",
          }}
        ></button>
        <button
          onClick={() => colorChange("violet")}
          style={{
            backgroundColor: "violet",
            width: "20px",
            height: "20px",
            border: "solid 1px",
          }}
        ></button>
        <button
          onClick={() => colorChange("lime")}
          style={{
            backgroundColor: "lime",
            width: "20px",
            height: "20px",
            border: "solid 1px",
          }}
        ></button>
        <button onClick={() => colorChange("white")}>지우개</button>
        <button
          onClick={() => setType(STRAIGHT)}
          style={{ width: "60px", height: "20px", border: "solid 1px" }}
        >
          직선형
        </button>
        <button
          onClick={() => setType(FREE)}
          style={{ width: "60px", height: "20px", border: "solid 1px" }}
        >
          자유형
        </button>
        <button onClick={clearAll}>전체지우기</button>
      </div>
      <canvas
        ref={canvasRef}
        id="canvas"
        width="500"
        height="500"
        onMouseDown={drawStart}
        onMouseMove={draw}
        onMouseUp={drawEnd}
        onMouseOut={drawEnd}
        // onTouchStart={touchStart}
        // onTouchMove={touch}
        onTouchEnd={drawEnd}
        style={{ border: "1px solid black" }}
      />
    </div>
  );
}
