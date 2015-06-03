# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

from warehouse.packaging.interfaces import IDownloadStatService, IFileStorage
from warehouse.packaging.services import RedisDownloadStatService
from warehouse.packaging.models import Project, Release


def includeme(config):
    # Register whatever file storage backend has been configured for storing
    # our package files.
    storage_class = config.maybe_dotted(
        config.registry.settings["files.backend"],
    )
    config.register_service_factory(storage_class.create_service, IFileStorage)

    # Register our service which will handle get the download statistics for
    # a project.
    config.register_service(
        RedisDownloadStatService(
            config.registry.settings["download_stats.url"],
        ),
        IDownloadStatService,
    )

    # Register our origin cache keys
    config.register_origin_cache_keys(
        Project,
        "project",
        "project/{obj.normalized_name}",
    )
    config.register_origin_cache_keys(
        Release,
        "project",
        "project/{obj.project.normalized_name}",
    )
