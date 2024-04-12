import { ChangeEvent, useEffect, useState } from "react";
import {
  FaEllipsisVertical,
  FaEyeDropper,
  FaRegKeyboard,
  FaUpDownLeftRight,
} from "react-icons/fa6";

interface EditableTextAreaProps {
  text: string;
  placeholder: string;
  textareaId: string;
  onTextChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

enum FontSize {
  SMALL = "Small",
  MEDIUM = "Medium",
  LARGE = "Large",
  LARGER = "Larger",
  X_LARGE = "X-Large",
  XX_LARGE = "XX-Large",
}

function EditableTextArea({
  text,
  placeholder,
  textareaId,
  onTextChange,
}: EditableTextAreaProps) {
  const [fontSize, setFontSize] = useState<FontSize>(FontSize.MEDIUM);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderlined, setIsUnderlined] = useState(false);
  const [fontColor, setFontColor] = useState("#3d454c");
  const [highlightColor, setHighlightColor] = useState("white");
  const [numWords, setNumWords] = useState(0);

  useEffect(() => {
    const numWords = text === "" ? 0 : text.trim().split(" ").length;
    setNumWords(numWords);
  }, [text]);

  const getVerticalLine = () => <div className="textarea-tools-line" />;

  const getTextAreaStyle = () => {
    return {
      fontSize: fontSize,
      fontWeight: isBold ? "bold" : "normal",
      fontStyle: isItalic ? "italic" : "normal",
      textDecoration: isUnderlined ? "underline" : "none",
      color: fontColor,
    };
  };

  return (
    <>
      <div className="textarea-tools">
        <div className="textarea-tools-top">
          <div className="textarea-tools-top-left">
            <span>Edit</span>
            <span>View</span>
            <span>Insert</span>
            <span>Format</span>
            <span>Tools</span>
            <span>Table</span>
          </div>
          <div className="textarea-tools-top-right">
            <span id="semicircle"></span>
            <span>100%</span>
          </div>
        </div>
        <div className="textarea-tools-bottom">
          {/* FONT SIZE / STYLE */}
          <select
            className="textarea-tools-dropdown cursor-pointer"
            onChange={(e) => setFontSize(e.target.value as FontSize)}
          >
            <option
              selected={fontSize === FontSize.SMALL}
              value={FontSize.SMALL}
            >
              Font {FontSize.SMALL}
            </option>
            <option
              selected={fontSize === FontSize.MEDIUM}
              value={FontSize.MEDIUM}
            >
              Font {FontSize.MEDIUM}
            </option>
            <option
              selected={fontSize === FontSize.LARGE}
              value={FontSize.LARGE}
            >
              Font {FontSize.LARGE}
            </option>
            <option
              selected={fontSize === FontSize.X_LARGE}
              value={FontSize.X_LARGE}
            >
              Font {FontSize.X_LARGE}
            </option>
            <option
              selected={fontSize === FontSize.XX_LARGE}
              value={FontSize.XX_LARGE}
            >
              Font {FontSize.XX_LARGE}
            </option>
          </select>
          <select
            className="textarea-tools-dropdown cursor-pointer"
            id="selectParagraph"
          >
            <option>Paragraph</option>
          </select>
          {getVerticalLine()}

          {/* BOLD / ITALIC / UNDERLINED */}
          <span
            id="selectBold"
            className="textarea-tool-items cursor-pointer"
            onClick={() => setIsBold(!isBold)}
          >
            B
          </span>
          <span
            id="selectItalic"
            className="textarea-tool-items cursor-pointer"
            onClick={() => setIsItalic(!isItalic)}
          >
            I
          </span>
          <span
            id="selectUnderline"
            className="textarea-tool-items cursor-pointer"
            onClick={() => setIsUnderlined(!isUnderlined)}
          >
            U
          </span>

          {/* FONT / HIGHLIGHT COLOR */}
          <label
            htmlFor="selectFontColor"
            id="selectFontColorLabel"
            className="cursor-pointer"
            style={{ color: fontColor, borderBottom: `4px solid ${fontColor}` }}
          >
            A
          </label>
          <input
            type="color"
            value={fontColor}
            id="selectFontColor"
            className="cursor-pointer"
            onChange={(e) => setFontColor(e.target.value)}
          />

          <label
            htmlFor="selectHighlightColor"
            id="selectHighlightColorLabel"
            className="cursor-pointer"
            style={{
              color: highlightColor !== "white" ? highlightColor : "3d454c",
              borderBottom: `4px solid ${highlightColor !== "white" ? highlightColor : "3d454c"}`,
            }}
          >
            <FaEyeDropper className="fs-6" id="highlightColorDropper" />
          </label>
          <input
            type="color"
            value={highlightColor}
            id="selectHighlightColor"
            className="cursor-pointer"
            onChange={(e) => setHighlightColor(e.target.value)}
          />

          <div className="superscript cursor-pointer">
            <span id="superscriptT">T</span>
            <sup>2</sup>
          </div>

          <div className="subscript cursor-pointer">
            <span id="subscriptT">T</span>
            <sub>2</sub>
          </div>

          {getVerticalLine()}
          <FaEllipsisVertical id="finalEllipsis" className="cursor-pointer" />
        </div>
      </div>

      <textarea
        className="editable-text-area"
        id={textareaId}
        cols={50}
        rows={5}
        value={text}
        style={getTextAreaStyle()}
        placeholder={placeholder}
        onChange={(e) => onTextChange(e)}
      ></textarea>

      <div className="textarea-tools-footer">
        <span id="pTag">p</span>
        <div className="textarea-tools-footer-right">
          <FaRegKeyboard className="fs-3 cursor-pointer" />
          {getVerticalLine()}
          <span>{numWords} words</span>
          {getVerticalLine()}
          <span id="leftRightArrows" className="cursor-pointer">
            {"</>"}
          </span>
          <FaUpDownLeftRight className="fs-5 cursor-pointer" />
          <span id="doubleEllipsis" className="cursor-pointer">
            &#8286;&#8286;
          </span>
        </div>
      </div>
    </>
  );
}

export default EditableTextArea;
