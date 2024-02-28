import { ChangeEvent, useState } from "react";
import { FaPlus, FaX } from "react-icons/fa6";
import { Module, Section, SectionItem, SectionItems } from "../../../types";

function AddLessons({
  newSection,
  setNewSection,
  newModule,
  setNewModule,
}: {
  newSection: Section;
  setNewSection: (section: Section) => void;
  newModule: Module;
  setNewModule: (newMod: Module) => void;
}) {
  const emptyLessons = [
    {
      _id: "1",
      title: "",
      url: "",
    },
    {
      _id: "2",
      title: "",
      url: "",
    },
    {
      _id: "3",
      title: "",
      url: "",
    },
  ];

  const [newLessons, setNewLessons] = useState<SectionItem[]>(emptyLessons);
  const [addingLessons, setAddingLessons] = useState(true);
  const [nextId, setNextId] = useState(4);

  const updateLessonTitle = (
    e: ChangeEvent<HTMLInputElement>,
    lessonId: string,
  ) => {
    const newTitle = e.target.value;
    const updatedLessons: SectionItems = [];
    newLessons.map((lesson) => {
      updatedLessons.push(
        lesson._id === lessonId ? { ...lesson, title: newTitle } : lesson,
      );
    });
    setNewLessons(updatedLessons);
  };

  const onLessonToggle = () => {
    setAddingLessons(!addingLessons);
  };

  const onAddLessonInput = () => {
    newLessons.push({
      _id: nextId.toString(),
      title: "",
      url: "",
    });
    setNextId(nextId + 1);
  };

  const updateSectionLessons = (newLessons: SectionItems) => {
    return newModule.sections.map((sec) =>
      sec._id === newSection._id ? { ...sec, lessons: newLessons } : sec,
    );
  };

  const onAddLesson = (lesson: SectionItem) => {
    const updatedLessons = [...newSection.lessons, lesson];

    setNewSection({ ...newSection, lessons: updatedLessons });
    setNewModule({
      ...newModule,
      sections: updateSectionLessons(updatedLessons),
    });

    setNewLessons(newLessons.filter((les) => les._id != lesson._id));
  };

  const onDeleteLesson = (lessonId: string) => {
    const filteredLessons = newSection.lessons.filter(
      (les) => les._id != lessonId,
    );
    setNewSection({ ...newSection, lessons: filteredLessons });

    setNewModule({
      ...newModule,
      sections: updateSectionLessons(filteredLessons),
    });
  };

  return (
    <div className="add-module-lesson">
      <div className="add-module-lesson-header">
        <h5>Add Lessons</h5>
        <button type="button" onClick={onLessonToggle}>
          {addingLessons ? (
            <FaX className="ms-2" size={16}></FaX>
          ) : (
            <FaPlus className="ms-2" size={18}></FaPlus>
          )}
        </button>
      </div>

      {addingLessons && (
        <div>
          {newSection.lessons.map((les) => (
            <div>
              <span>{les.title}</span>
              <button
                type="button"
                className="delete-lesson-btn"
                onClick={() => onDeleteLesson(les._id)}
              >
                <FaX className="ms-2"></FaX>
              </button>
            </div>
          ))}

          <div className="add-section-input">
            {newLessons.map((lesson) => (
              <div className="add-lesson-input">
                <input
                  type="text"
                  value={lesson.title}
                  placeholder="Lesson Title"
                  onChange={(e) => updateLessonTitle(e, lesson._id)}
                />
                <button
                  type="button"
                  className="add-module-btns"
                  onClick={() => onAddLesson(lesson)}
                >
                  Add
                </button>
              </div>
            ))}
          </div>

          <div className="add-lesson-input">
            <button
              type="button"
              className="add-module-btns"
              onClick={onAddLessonInput}
            >
              <FaPlus></FaPlus>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddLessons;
