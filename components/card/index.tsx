'use client';

import React from 'react'
import FrameOne from '../../public/assets/images/FrameOne.jpg'
import FrameTwo from '../../public/assets/images/Frame7.jpg'
import { Avatar } from '@chakra-ui/react';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-regular-svg-icons";

interface PropType {
  author: string,
  title: string,
  body: string,
  dateTime: string,
}

const PostCard = ({ author, title, body, dateTime }: PropType) => {
  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between max-w-2xl mx-8 my-4 sm:max-w-2xl lg:max-w-3xl">
        <div className="flex flex-col justify-between">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-1">
              <Avatar src={FrameTwo.src} size="sm" name="Jonathan Reinink" />
              <div className='flex items-center gap-1'>
                <p className="font-medium leading-none text-gray-900">
                  {author}
                </p>
                {" . "}
                <p className="text-sm">
                  {moment(dateTime)
                    .fromNow(true)
                    .replace("minutes", "hours")}{" "}
                  ago
                </p>
              </div>
            </div>
            <div className="mb-2 base:text-[20px] lg:text-[28px] font-bold text-gray-900">
              {title}
            </div>
            <ReactMarkdown children={body} />
          </div>
          <div className="flex gap-2 text-sm">
            <p>
              <FontAwesomeIcon icon={faHeart} /> 5k
            </p>
            <p>
              <FontAwesomeIcon icon={faComment} /> 71
            </p>
          </div>
        </div>
        <img
          src={FrameOne.src}
          alt="img"
          className="hidden md:block md:w-36 md:h-36"
        />
      </div>
    </div>
  );
}

export default PostCard