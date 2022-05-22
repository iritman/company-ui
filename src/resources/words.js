import { Component } from "react";

class Words extends Component {
  static app_name = "سینترا";
  static app_company = "فولاد بهمن";
  static unhandled_exception = "خطایی در سامانه رخ داده است";
  static copyright =
    "تمامی حقوق این سامانه متعلق به گروه صنعتی فولاد بهمن می باشد";
  static main_menu = "منوی اصلی";
  static search = "جستجو";
  static clear = "پاکسازی";
  static reload = "بارگذاری مجدد";
  static new = "جدید";
  static edit = "ویرایش";
  static delete = "حذف";
  static newInfo = "ثبت اطلاعات";
  static editInfo = "ویرایش اطلاعات";
  static submit = "ثبت";
  static search_text = "متن جستجو";
  static empty_data = "اطلاعاتی برای نمایش وجود ندارد";
  static id = "شناسه";
  static title = "عنوان";
  static yes = "بله";
  static no = "خیر";
  static ok = "اعمال";
  static cancel = "انصراف";
  static excel = "اکسل";
  static view_all = "نمایش همه";
  static username = "نام کاربری";
  static password = "رمز عبور";
  static login_to_app = "ورود به سامانه";
  static logout = "خروج";
  static status = "وضعیت";
  static active = "فعال";
  static inactive = "غیرفعال";
  static accesses = "دسترسی ها";
  static can_add = "امکان ثبت";
  static can_edit = "امکان ویرایش";
  static can_delete = "امکان حذف";
  static can_view = "امکان مشاهده";
  static role = "سمت";
  static roles = "سمت ها";
  static close = "بستن";
  static hour = "ساعت";
  static privillage = "مجوز";
  static download = "دانلود";
  static view_image = "مشاهده تصویر";
  static reg_date = "تاریخ ثبت";
  static reg_time = "زمان ثبت";
  static first_name = "نام";
  static last_name = "نام خانوادگی";
  static reg_date_time = "تاریخ و زمان ثبت";
  static full_name = "نام و نام خانوادگی";
  static member_id = "شناسه کاربر";
  static national_code = "کد ملی";
  static mobile = "موبایل";
  static account_status = "وضعیت حساب کاربری";
  static gender = "جنسیت";
  static male = "آقا";
  static female = "خانم";
  static male_female = "خانم/آقا";
  static active_inactive = "فعال/غیرفعال";
  static person = "نفر";
  static radif = "ردیف";
  static from_date = "از تاریخ";
  static to_date = "تا تاریخ";
  static from = "از";
  static to = "تا";
  static type = "نوع";
  static percent = "درصد";
  static save_settings = "ذخیره تنظیمات";
  static search_text = "متن جستجو";
  static clear = "پاکسازی";
  static view_all = "نمایش همه";
  static excel = "اکسل";
  static new = "جدید";
  static select_please = "انتخاب کنید";
  static parent_department = "دپارتمان والد";
  static office_tel = "تلفن ثابت";
  static fax = "فکس";
  static address = "آدرس";
  static postal_code = "کدپستی";
  static national_id = "شناسه ملی";
  static financial_code = "کد اقتصادی";
  static reg_no = "شماره ثبت";
  static more_details = "جزئیات بیشتر";
  static confirm = "تایید";
  static fix_tel = "تلفن ثابت";
  static birth_date = "تاریخ تولد";
  static profile_image = "تصویر پروفایل";
  static reg_member = "ثبت کننده";
  static attached_file = "فایل پیوست";
  static select_file = "انتخاب فایل";
  static max_file_size = "حداکثر ظرفیت فایل جهت آپلود یک مگابایت می باشد";
  static max_file_size_1 = "حداکثر ظرفیت فایل آپلود ";
  static max_file_size_2_mb = " مگابایت می باشد";
  static max_file_size_2_kb = " کیلوبایت می باشد";
  static limit_upload_file_size =
    "حجم فایل شما بیشتر از مقدار تعیین شده می باشد";
  static department_manager = "مدیر دپارتمان";
  static department_supervisor = "سرپرست دپارتمان";
  static descriptions = "توضیحات";
  static transmission_descriptions = "توضیحات ویژه واحد نقلیه";
  static generate_random_account_info = "تولید نام کاربری و رمز عبور تصادفی";
  static color_code = "کد رنگ";
  static color_id = "شناسه رنگ";
  static show_order = "ترتیب نمایش";
  static move_up = "انتقال به بالا";
  static move_down = "انتقال به پایین";
  static duty_title = "عنوان وظیفه";
  static remove_image = "حذف تصویر";
  static reload_image = "بازیابی تصویر";
  static invalid_national_code = "کدملی نامعتبر";
  static settings = "تنظیمات سامانه";
  static admin_panel = "پنل مدیریت";
  static basic_settings = "اطلاعات پایه";
  static nafar = "نفر";
  static no_employee = "بدون کارمند!";
  static no_department_manager_or_supervisor = "بدون مدیر یا سرپرست!";
  static vacation_format = "قالب مرخصی";
  static mission_format = "قالب ماموریت";
  static by_day = "روزانه";
  static by_hour = "ساعتی";
  static submit_crop = "ثبت تصویر برش داده شده";
  static new_image = "تصویر جدید";
  static past_image = "تصویر قبلی";
  static re_cut = "برش مجدد";
  static please_wait = "لطفا صبر کنید ...";
  static please_wait_for_load_image = "لطفا تا بارگذاری تصویر شکیبا باشید ...";
  static visit_profile = "مشاهده حساب کاربری";
  static logout_from_account = "خروج از حساب کاربری";
  static date = "تاریخ";
  static time = "زمان";
  static holiday_date = "تاریخ تعطیلی";
  static can_add = "امکان ثبت";
  static can_edit = "امکان ویرایش";
  static can_delete = "امکان حذف";
  static can_view = "امکان مشاهده";
  static back = "بازگشت";
  static your_duties = "شرح وظایف شما";
  static member_duties = "شرح وظایف پرسنل";
  static duty_type = "نوع وظیفه";
  static by_personal = "فردی";
  static by_role = "سمت";
  static by_role_personal = "سمت - فردی";
  static work_hours = "ساعت های کاری";
  static work_shifts = "شیفت های کاری";
  static work_shift = "شیفت کاری";
  static shift_code = "کد شیفت";
  static work_hour_code = "کد ساعت کاری";
  static start_time = "زمان شروع";
  static finish_time = "زمان پایان";
  static un_delay_in_min = "عدم محاسبه تاخیر";
  static un_hurryup_in_min = "عدم محاسبه تعجیل";
  static un_extra_enter_in_min = "عدم محاسبه اضافه کاری ورود";
  static un_extra_exit_in_min = "عدم محاسبه اضافه کاری خروج";
  static group_shifts = "شیفت های گروهی";
  static shift_date = "تاریخ شیفت";
  static start_date = "تاریخ شروع";
  static finish_date = "تاریخ پایان";
  static employee_shifts = "شیفت های فردی";
  static month = "ماه";
  static year = "سال";
  static week_day = "روز هفته";
  static holiday = "تعطیل";
  static card_no = "شماره کارت";
  static is_married = "وضعیت تاهل";
  static marriage_date = "تاریخ ازدواج";
  static father_name = "نام پدر";
  static personal_id = "شماره شناسنامه";
  static latest_edu_average = "آخرین معدل تحصیلی";
  static employment_start_date = "تاریخ شروع کار";
  static employment_finish_date = "تاریخ پایان کار";
  static single = "مجرد";
  static married = "متاهل";
  static marriage_status = "وضعیت تاهل";
  static reged_cards = "ترددهای ثبت شده";
  static reg_type = "نوع ثبت";
  static security_guard_reg_id = "شناسه ثبت نگهبان";
  static manual_reg_date = "تاریخ ثبت دستی";
  static manual_reg_time = "ساعت ثبت دستی";
  static registerar = "ثبت کننده";
  static manual_reg_date_time = "تاریخ و ساعت ثبت دستی";
  static my_cartable = "کارتابل من";
  static security_cartable = "کارتابل نگهبانی";
  static department_cartable = "کارتابل دپارتمان";
  static official_cartable = "کارتابل اداری";
  static is_transfered_to_member_reged_cards = "انتقال یافته به تردد اصلی";
  static transfered_to_member_reged_cards = "انتقال به تردد اصلی";
  static is_transfered = "انتقال یافته";
  static transferer = "انتقال دهنده";
  static transfer_date = "تاریخ انتقال";
  static transfer_time = "ساعت انتقال";
  static security_guard_reg_date_time = "تاریخ و زمان ثبت نگهبان";
  static security_guard_descriptions = "توضیحات نگهبان";
  static swap_member = "کارمند جایگزین";
  static from_time = "ساعت شروع";
  static to_time = "ساعت پایان";
  static in_progress = "درحال بررسی";
  static accepted = "تایید شده";
  static rejected = "رد شده";
  static accept_request = "تایید درخواست";
  static reject_request = "رد درخواست";
  static search_type = "نوع جستجو";
  static submit_response = "ثبت پاسخ";
  static your_response = "پاسخ شما";
  static im_accept_replace_work_request = "درخواست جانشینی را می پذیرم";
  static im_not_accept_replace_work_request = "درخواست جانشینی را نمی پذیرم";
  static im_accept_request = "درخواست را تایید می کنم";
  static im_not_accept_request = "درخواست را تایید نمی کنم";
  static manager = "مدیر";
  static official_manager = "مسئول اداری";
  static swap_member_response = "پاسخ جانشین";
  static new_swap_member = "کارمند جایگزین جدید";
  static reg_info = "اطلاعات ثبت";
  static request_status = "وضعیت درخواست";
  static in_province = "داخل استان";
  static requirements = "نیازمندی ها";
  static transmission_manager = "مسئول ترابری";
  static transmission_info = "اطلاعات ترابری";
  static mission_report = "گزارش ماموریت";
  static report_text = "متن گزارش";
  static need_correction = "اعلام نقص";
  static notes = "یادداشت ها";
  static mission_notes = "یادداشت های ماموریت";
  static note_text = "متن یادداشت";
  static visible_for_employee = "نمایش برای کارمند";
  static note_visible_for_employee = "عدم نمایش برای کارمند";
  static new_note = "یادداشت جدید";
  static edit_note = "ویرایش یادداشت";
  static department_extra_work_capacities = "ظرفیت اضافه کار دپارتمان ها";
  static capacity_in_hours = "ظرفیت (ساعت)";
  static extra_work_command_sources = "منابع دستور اضافه کار";
  static extra_work_command_source = "منبع دستور اضافه کار";
  static tasks = "مدیریت وظایف";
  static tags = "برچسب ها";
  static interval_tasks = "وظایف تکرارشونده";
  static response_member = "پیگیری کننده";
  static interval_type = "نوع تکرار";
  static task_info = "اطلاعات وظیفه";
  static timing = "زمانبندی";
  static run_time = "زمان اجرا";
  static supervisors = "ناظران";
  static extra_work_capacity = "ظرفیت اضافه کاری";
  static request_duration = "مدت درخواست";
  static total_request_duration = "مجموع مدت درخواست";
  static with_fee = "با حقوق";
  static without_fee = "بدون حقوق";
  static fee_status = "وضعیت حقوق";
  static no_alternative_employees = "پرسنل بدون جانشین";
  static response = "پاسخ";
  static no_alternative_employee = "بدون جانشین";
  static work_group = "گروه کاری";
  static work_groups = "گروه های کاری";
  static shift_info = "اطلاعات شیفت";
  static view = "مشاهده";
  static update = "بروزرسانی";
  static new_request = "درخواست جدید";
  static vacation_cardex_settings = "تنظیمات کاردکس مرخصی";
  static total_valid_personal_vacation = "ظرفیت مجاز مرخصی استحقاقی";
  static total_valid_personal_vacation_in_min =
    "ظرفیت مجاز مرخصی استحقاقی (دقیقه)";
  static is_personal_vacation = "مرخصی استحقاقی";
  static vacation_cardexes = "کاردکس های مرخصی";
  static personal_vacation_capacity = "ظرفیت مرخصی استحقاقی";
  static personal_vacation_capacity_in_min = "ظرفیت مرخصی استحقاقی (دقیقه)";
  static used_capacity = "ظرفیت مورد استفاده";
  static remain_capacity = "ظرفیت باقی مانده";
  static reg_jome_holidays = "ثبت تعطیلات جمعه";
  static repeat_work_shifts = "تکرار شیفت";
  static from_month = "از ماه";
  static from_day = "از روز";
  static to_month = "تا ماه";
  static to_day = "تا روز";
  static skip_jome_days = "پرزش از جمعه ها";
  static skip_holidays = "پرش از روزهای تعطیل";
  static repeat_work_shifts_to_date = "تکرار شیفت تا تاریخ";
  static delete_work_shifts = "حذف شیفت های کاری";
  static my_reports_cartable = "گزارش های من";
  static employees_reports_cartable = "گزارش های کارکنان";
  static in_reg_time = "زمان ورود";
  static out_reg_time = "زمان خروج";
  static duration = "مدت";
  static day = "روز";
  static delay = "تاخیر";
  static minute = "دقیقه";
  static task_details = "جزئیات وظیفه";
  static reports = "گزارش ها";
  static unseen = "مشاهده نشده";
  static seen_in = "مشاهده شده در";
  static attached_files = "فایل های پیوست";
  static delay_status = "وضعیت تاخیر";
  static make_task_finish = "ثبت خاتمه";
  static reminder_date_time = "زمان سررسید";
  static done_status = "وضعیت انجام";
  static in_done_progress = "درحال انجام";
  static without_delay = "بدون تاخیر";
  static definer = "تعریف کننده";
  static from_done_date = "اجرا از تاریخ";
  static to_done_date = "اجرا تا تاریخ";
  static from_reminder_date = "سررسید از تاریخ";
  static to_reminder_date = "سررسید تا تاریخ";
  static my_done_tasks = "انجام شده ها";
  static other_than_this_month = "بیش از یک ماه اخیر";
  static has_new_report = "حاوی گزارش جدید";
  static response_member = "مسئول اجرا";
  static is_done = "خاتمه یافته";
  static cancel_done_task = "عدم تایید اجرا و فعالسازی مجدد";
  static delayed_tasks = "کارهای دارای تاخیر";
  static done_tasks = "کارهای انجام شده";
  static following = "پیگیری";
  static colleagues = "همکاران";
  static reged_reports = "گزارش های ثبت شده";
  static unread_reports = "گزارش های خوانده نشده";
  static new_reports = "گزارش های جدید";
  static under_supervision_tasks = "تحت نظارت";
  static finished_supervision_tasks = "نظارت شده";
  static banks = "بانک ها";
  static bank = "بانک";
  static account_no = "شماره حساب";
  static sheba_no = "شماره شبا";
  static bank_accounts = "حساب های بانکی";
  static search_in_employees = "جستجو در کارکنان";

  static violation_person = "کارمند خاطی";
  static violations = "اخطار - تعهد";

  static processes = "فرآیندها";
  static dismissal = "اخراج";
  static dismissal_official = "اخراج (اداری)";
  static edu_fund = "کمک هزینه تحصیلی";
  static edu_fund_official = "کمک هزینه تحصیلی (اداری)";
  static learning = "آموزش";
  static checkout = "تسویه حساب";
  static employment = "استخدام";
  static personal_replacement = "جایجایی شخصی";
  static manager_replacement = "جابجایی مدیریتی";

  static childs_count = "تعداد فرزندان";
  static relative_tel_role_1 = "عنوان وابسته 1";
  static relative_tel_1 = "شماره تماس وابسته 1";
  static relative_tel_role_2 = "عنوان وابسته 2";
  static relative_tel_2 = "شماره تماس وابسته 2";
  static safteh_no_1 = "شماره سفته 1";
  static safteh_no_2 = "شماره سفته 2";

  static employees_tasks = "پیگیری از دیگران";
  static my_tasks = "وظایف من";
  static my_task = "وظیفه من";
  static task_supervisions = "نظارت ها";
  static new_task = "وظیفه جدید";
  static reminder_date = "تاریخ سررسید";
  static reminder_time = "زمان سررسید";
  static task_responsible = "مسئول انجام";
  static today_tasks = "کارهای امروز";
  static tomorrow_tasks = "کارهای فردا";
  static this_month_tasks = "کارهای این ماه";
  static has_delay_tasks = "کارهای دارای تاخیر";
  static future_tasks = "کارهای آتی";
  static new_report = "گزارش جدید";

  static report_my_in_out_cards = "گزارش ورود و خروج من";

  static total = "کل";
  static used = "مصرف شده";
  static remain = "باقیمانده";

  static new_extra_work_request = "ثبت درخواست اضافه کار";
  static extra_work_requests = "درخواست های اضافه کار";

  static mission_new_reports = "گزارش های جدید ماموریت";
  static mission_reply_status = "نتیجه بررسی گزارش";

  static approved_and_reg_vehicle_request = "تایید و ثبت درخواست نقلیه";

  static i_need = "دارم";
  static i_dont_need = "ندارم";

  static mission_targets = "مقصدهای ماموریت";
  static mission_target = "مقصد ماموریت";
  static mission_target_type = "نوع مقصد";
  static inside_province = "داخل استان";
  static outside_province = "خارج از استان";
  static mission_subject = "موضوع ماموریت";
  static need_vehicle = "نیاز به وسیله نقلیه";
  static need_hoteling = "نیاز به اقامتگاه";

  static transmission = "ترابری";
  static vehicles = "وسایل نقلیه";
  static vehicle = "وسیله نقلیه";
  static hoteling = "محل اقامت";
  static vehicle_types = "انواع وسایل نقلیه";
  static vehicle_type = "نوع وسیله نقلیه";
  static vehicle_brands = "برندها";
  static vehicle_brand = "برند خودرو";
  static vehicle_models = "مدل های خودرو";
  static brand = "برند";
  static model = "مدل";
  static product_year = "سال تولید";
  static pelak = "پلاک";

  static step_1 = "مرحله 1";
  static step_2 = "مرحله 2";
  static step_3 = "مرحله 3";
  static step_4 = "مرحله 4";

  static request_info = "اطلاعات درخواست";
  static swap_member_response = "پاسخ جانشین";
  static manager_response = "پاسخ مدیر";
  static official_response = "پاسخ اداری";
  static official_expert = "کارشناس اداری";
  static response_reg_date = "تاریخ ثبت پاسخ";
  static response_reg_time = "زمان ثبت پاسخ";
  static start = "شروع";
  static finish = "پایان";

  static security_guard_reged_cards = "کنترل تردد نگهبانی";
  static my_reged_cards = "ترددهای من";
  static my_work_shifts = "شیفت های کاری من";
  static my_missions = "ماموریت های من";
  static my_vacations = "مرخصی های من";
  static vacation_replace_work_requests = "جانشینی های مرخصی";
  static mission_replace_work_requests = "جانشینی های ماموریت";
  static my_work_report = "گزارش کارکرد من";
  static official_experts = "کارشناسان اداری";
  static members_reged_cards = "ترددهای کارکنان";
  static members_work_shifts = "شیفت های کاری کارکنان";
  static members_missions = "ماموریت های کارکنان";
  static members_vacations = "مرخصی های کارکنان";
  static approved_vacations = "مرخصی های تایید شده";
  static approved_missions = "ماموریت های تایید شده";
  static members_work_report = "گزارش کارکرد کارکنان";
  static members_vacations_check_manager = "مرخصی های جدید";
  static members_missions_check_manager = "ماموریت های جدید";
  static members_vacations_check_official = "مرخصی های جدید";
  static members_missions_check_official = "ماموریت های جدید";
  static requester = "متقاضی";
  static vacation_requests = "درخواست های مرخصی";
  static mission_requests = "درخواست های ماموریت";
  static request_reg_date = "تاریخ درخواست";
  static request_reg_time = "زمان درخواست";
  static transfer_type = "نوع ترابری";
  static request_from_date = "درخواست از تاریخ";
  static request_to_date = "درخواست تا تاریخ";
  static mission_from_date = "ماموریت از تاریخ";
  static mission_to_date = "ماموریت تا تاریخ";
  static request_type = "نوع درخواست";

  static edu_levels = "مقاطع تحصیلی";
  static edu_level = "مقطع تحصیلی";
  static edu_fields = "رشته های تحصیلی";
  static edu_field = "رشته تحصیلی";
  static universities = "دانشگاه ها";
  static university = "دانشگاه";
  static employment_types = "انواع استخدام";
  static employment_type = "نوع استخدام";
  static employment_statuses = "وضعیت های استخدام";
  static employment_status = "وضعیت استخدام";
  static work_places = "محل های خدمت";
  static work_place = "محل خدمت";

  static dashboard = "داشبورد";
  //----
  static official = "اداری";
  //----
  static org_structure = "ساختار سازمانی";
  static departments = "دپارتمان ها";
  static department = "دپارتمان";
  static roles = "سمت ها";
  static role = "سمت";
  static companies = "شرکت ها";
  static company = "شرکت";
  static members = "کاربران";
  static member = "کاربر";
  static employees = "کارکنان";
  static employee = "کارمند";
  static company_agents = "رابطین شرکت ها";
  static company_agent = "رابط شرکت";
  static comp_agents = "رابطین شرکت";
  static duty_levels = "سطوح وظایف";
  static duties = "شرح وظایف";
  static personal_duties = "شرح وظایف فردی";
  static role_duties = "شرح وظایف سمت";
  static duty_level = "سطح وظیفه";
  //---
  static provinces = "استان ها";
  static province = "استان";
  static cities = "شهرها";
  static city = "شهر";
  //---
  static security_guards = "نگهبان ها";
  static security_guard = "نگهبان";
  //---
  static timex = "تایمکس";
  static timex_settings = "تنظیمات تایمکس";
  static security = "امنیت";
  static indexes = "شاخص ها";
  static vacations = "مرخصی ها";
  static missions = "ماموریت ها";
  static work_time_info = "اطلاعات تردد";
  static reports = "گزارش ها";
  //---
  static vacation_types = "انواع مرخصی";
  static vacation_type = "نوع مرخصی";
  static mission_types = "انواع ماموریت";
  static mission_type = "نوع ماموریت";
  static holidays = "تعطیلات";
  //---
  static page_accesses = "دسترسی صفحات";
  //---
  static automation = "اتوماسیون اداری";
  //---
  static transmission = "ترابری";
  static transmission_requests = "درخواست های نقلیه";
  //---

  static messages = {
    operation_failed: "امکان انجام عملیات وجود ندارد",
    success_submit: "ثبت اطلاعات با موفقیت انجام شد",
    no_national_code: "کدملی وارد نشده است",
    page_not_found: "صفحه مورد درخواست شما یافت نشد",
    invalid_access_page: "متاسفانه مجاز به دیدن این صفحه نمی باشید",
    success_load_graph: "چارت سازمانی با موفقیت بارگذاری شد",
    card_reg_transfered_to_primary_list: "تردد به لیست اصلی انتقال یافت",
    your_response_not_submitted: "پاسخ شما ثبت نشده است",
    your_response_submitted: "پاسخ شما ثبت شد",
    swap_member_response_not_submitted:
      "پاسخ جانشین انتخابی کاربر ثبت نشده است",
    manager_response_not_submitted: "پاسخ مدیر ثبت نشده است",
    official_response_not_submitted: "پاسخ مسئول اداری ثبت نشده است",
    transmission_response_not_submitted: "پاسخ مسئول ترابری ثبت نشده است",
    your_report_submitted: "گزارش شما ثبت شد",
    no_report_submitted_yet: "گزارشی ثبت نشده است",
    your_report_deleted: "گزارش ماموریت شما حذف شد",
    no_note_submitted_yet: "یادداشتی ثبت نشده است",
    your_note_submitted: "یادداشت شما ثبت شد",
    note_deleted: "یادداشت مورد نظر حذف شد",
    no_response_submitted: "پاسخ # ثبت نشده است",
    num_of_new_requests_submitted: "# درخواست جدید ثبت شده است",
    no_new_requests: "درخواست جدیدی ثبت نشده است",
    num_of_new_vacation_replace_work_requests:
      "# درخواست جانشینی مرخصی ثبت شده است",
    num_of_new_mission_replace_work_requests:
      "# درخواست جانشینی ماموریت ثبت شده است",
    num_of_new_vacation_requests: "# درخواست مرخصی ثبت شده است",
    num_of_new_mission_requests: "# درخواست ماموریت ثبت شده است",
    num_of_new_mission_reports: "# گزارش جدید ماموریت ثبت شده است",
    num_of_new_extra_work_requests: "# درخواست اضافه کاری ثبت شده است",
    no_work_shift_defined: "شیفت کاری تعریف نشده است",
    work_shift_deleted: "شیف کاری حذف شد",
    jome_holidays_submitted: "تعطیلات روزهای جمعه ثبت شدند",
    repeat_work_shifts_message:
      "این دوره از بعد از خودش بطور متوالی تکرار خواهد شد",
    work_shift_repeated: "تکرار شیفت با موفقیت انجام شد",
    work_shifts_deleted: "شیفت های کاری حذف شدند",
    upload_failed: "امکان آپلود فایل وجود ندارد",
    no_any_tasks: "وظیفه ای ثبت نشده است",
    no_any_report: "گزارشی ثبت نشده است",
    submit_report_in_done_task_failed:
      "ثبت گزارش در وظیفه خاتمه یافته امکان پذیر نمی باشد",
    not_any_tasks_founded: "وظیفه ای یافت نشد",
    submit_response_in_finished_dismissal_request_failed:
      "قبلا به این درخواست پاسخ داده شده است",
    submit_response_in_finished_edu_fund_request_failed:
      "قبلا به این درخواست پاسخ داده شده است",
  };

  static questions = {
    sure_to_logout: "برای خروج از سامانه اطمینان دارید؟",
    sure_to_delete_item: "برای حذف رکورد انتخابی اطمینان دارید؟",
    sure_to_delete_image: "برای حذف تصویر اطمینان دارید؟",
    sure_to_transfer: "برای انجام انتقال اطمینان دارید؟",
    sure_to_submit_response_for_replace_work_request:
      "برای ثبت پاسخ درخواست جانشینی اطمینان دارید؟",
    sure_to_submit_response: "برای ثبت پاسخ درخواست اطمینان دارید؟",
    sure_to_submit_report: "برای ثبت گزارش اطمینان دارید؟",
    sure_to_submit_report_reply: "برای ثبت پاسخ گزارش اطمینان دارید؟",
    sure_to_delete_report: "برای حذف گزارش اطمینان دارید؟",
    sure_to_submit_note: "برای ثبت یادداشت ماموریت اطمینان دارید؟",
    sure_to_delete_note: "برای حذف یادداشت ماموریت اطمینان دارید؟",
    sure_to_delete_work_shift: "برای حذف شیفت کاری اطمینان دارید؟",
    sure_to_reg_jome_holidays: "برای ثبت تعطیلات روزهای جمعه اطمینان دارید؟",
    sure_to_delete_task: "برای حذف وظیفه اطمینان دارید؟",
    sure_to_make_task_done: "برای اعلام خاتمه انجام وظیفه اطمینان دارید؟",
    sure_to_cancel_done_task: "برای لغو خاتمه اجرای وظیفه اطمینان دارید؟",
  };

  static monthes = {
    farvardin: "فروردین",
    ordibehesht: "اردیبهشت",
    khordad: "خرداد",
    //---
    tir: "تیر",
    mordad: "مرداد",
    shahrivar: "شهریور",
    //---
    mehr: "مهر",
    aban: "آبان",
    azar: "آذر",
    //---
    dey: "دی",
    bahman: "بهمن",
    esfand: "اسفند",
  };
}

export default Words;
