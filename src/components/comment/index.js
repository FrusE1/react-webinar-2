import React from 'react';
import { cn as bem } from "@bem-react/classname";
import propTypes from 'prop-types';
import './style.css';
import dateFormating from '../../utils/date-formatting';
import AnswerComment from '../comment-form/answer';

function Comment({ comment, level, ...props }) {
  const cn = bem('Comment');

  const paddingLeft = (level > 0 && level < 10) ? 30 : 0;
  const name = comment.author.profile?.name ? comment.author.profile.name : props.name;

  return (
    <div style={{ paddingLeft: paddingLeft }} className={cn()}>
      <div className={cn('head')}>
        <div className={cn('name')}>{name}</div>
        <div className={cn('time')}>{dateFormating(comment.dateCreate)}</div>
      </div>
      <div className={cn('body')}>{comment.text}</div>
      <a className={cn('link')} onClick={() => props.setVisibleTextArea(comment._id)}>Ответить</a>
      {comment.children.map(item =>
        <div key={item._id} className={cn('child')}>
          {props.renderItem(item, level + 1)}
        </div>
      )}
      {comment._id === props.visibleTextArea && props.renderForm(comment._id, name)}
    </div>
  )
}

Comment.propTypes = {
  comment: propTypes.object.isRequired,
  level: propTypes.number.isRequired,
  setVisibleTextArea: propTypes.func.isRequired,
  visibleTextArea: propTypes.string.isRequired,
  name: propTypes.string,
  renderItem: propTypes.func,
  renderForm: propTypes.func,
}

Comment.defaultProps = {
  name: '',
  renderItem: (item, level) => {
    return item.toString()
  },
  renderForm: (id, name) => { },
}

export default React.memo(Comment)