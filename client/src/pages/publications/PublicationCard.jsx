// Tarjetas de publicaciones de HOME

import React from "react";
import "../../styles/PublicationCard.css";
import "../../styles/common.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getPlatformColor, getPlatformIcon } from "../../utils/platform";

export function PublicationCard({
  variant = "feed",

  title,
  avatar,
  content,
  username,

  usuarioId,
  publicationId,

  tag,
  platform,
  colorTheme,
}) {
  const navigate = useNavigate();

  const isFeed = variant === "feed";

  return (
    <div
      className={`publication-card publication-card--${variant}`}
      onClick={
        isFeed
          ? () => navigate(`/update-publication/${publicationId}`)
          : undefined
      }
    >
      <div className="publication-card__body">
        <img
          src={content}
          alt={title}
          className="publication-card__image"
        />
      </div>

      <div className="publication-card__footer">
        <div className="user-information">

          {isFeed ? (
            <Link to={`/profile/${usuarioId}`}>
              <img
                src={avatar}
                alt={username}
                className="user-information__img"
                style={{ borderColor: colorTheme }}
              />
            </Link>
          ) : (
            <img
              src={avatar}
              alt={username}
              className="user-information__img"
              style={{ borderColor: colorTheme }}
            />
          )}

          <div className="publication-card__text">

            <div className="publication-card__tags">

              <p
                className={`publication-card__tag publication-card__tag--platform ${getPlatformColor(
                  platform
                )}`}
              >
                <FontAwesomeIcon
                  icon={getPlatformIcon(platform)}
                  style={{ marginRight: 2 }}
                />
                {platform}
              </p>

              <p className="publication-card__tag publication-card__tag--category">
                {tag}
              </p>

            </div>

            <p className="publication-card__title">
              {title}
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}
