import { useState } from "react";
import { Module, Section, SectionItem, SectionItems } from "../../../types";

function AddLesson({
  section,
  newModule,
  setNewModule,
}: {
  section: Section;
  newModule: Module;
  setNewModule: (newMod: Module) => void;
}) {
  const emptyLesson = {
    _id: "",
    title: "",
    url: "",
  };
  const [newLesson, setNewLesson] = useState<SectionItem>(emptyLesson);

  const updateSectionLessons = (newLessons: SectionItems) => {
    return newModule.sections.map((sec) =>
      sec._id === section._id ? { ...sec, lessons: newLessons } : sec,
    );
  };

  const onAddLesson = () => {
    const newId = new Date().getTime().toString();
    const updatedLessons = [...section.lessons, { ...newLesson, _id: newId }];

    setNewModule({
      ...newModule,
      sections: updateSectionLessons(updatedLessons),
    });
    setNewLesson(emptyLesson);
  };

  const onDeleteLesson = (lessonId: string) => {
    const filteredLessons = section.lessons.filter(
      (les) => les._id != lessonId,
    );

    setNewModule({
      ...newModule,
      sections: updateSectionLessons(filteredLessons),
    });
  };

  return (
    <div className="add-module-lesson">
      <h5>Add Lessons</h5>

      <div className="add-section-input">
        <input
          type="text"
          value={newLesson.title}
          placeholder="Lesson Title"
          onChange={(e) =>
            setNewLesson({
              ...newLesson,
              title: e.target.value,
            })
          }
        />
        <button
          type="button"
          className="add-module-btns"
          onClick={onAddLesson}
          disabled={newLesson.title === ""}
        >
          Add
        </button>
      </div>

      {section.lessons.map((lesson) => (
        <div>
          <span>{lesson.title}</span>
          <button
            type="button"
            className="add-module-btns"
            onClick={() => onDeleteLesson(lesson._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default AddLesson;
