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

  static can_view = "امکان مشاهده";
  static can_add = "امکان ثبت";
  static can_edit = "امکان ویرایش";
  static can_delete = "امکان حذف";

  static just_view = "مشاهده";
  static just_add = "ثبت";
  static just_edit = "ویرایش";
  static just_delete = "حذف";

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
  static top_supervisors = "ناظران ارشد";
  static top_supervisor = "ناظر ارشد";
  static descriptions = "توضیحات";
  static transmission_descriptions = "توضیحات ویژه واحد نقلیه";
  static hoteling_descriptions = "توضیحات وضعیت اقامتگاه";
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
  static informatic_cartable = "کارتابل انفورماتیک";
  static store_cartable = "کارتابل انبار";
  static financial_cartable = "کارتابل مالی";
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
  static selected_supervisors = "ناظران منتخب";
  static selected_supervisor = "ناظر منتخب";
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
  static task = "وظیفه";
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
  static in_progress_task = "درحال اجرا";
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
  static not_have = "ندارد";
  static issued = "صادر شده";
  static new_announcement = "ابلاغیه جدید";
  static seen_date = "تاریخ مشاهده";
  static seen_time = "زمان مشاهده";
  static complainant = "شاکی";
  static violation_report = "گزارش تخلف";
  static announcement_sender = "ارسال کننده ابلاغ";
  static issue_date = "تاریخ صدور";
  static seen = "مشاهده شده";
  static private = "محرمانه";
  static transfer_description = "توضیحات وسیله نقلیه";
  static hoteling_description = "توضیحات اقامت";

  static new_announces = "اطلاعیه های جدید";
  static archived_announces = "آرشیو اطلاعیه ها";
  static my_announces = "اطلاعیه های ارسالی";
  static announces = "اطلاعیه ها";
  static contacts = "مخاطبین";
  static seen_count = "تعداد مشاهده";
  static all_employees = "همه کارکنان";
  static select_list = "انتخاب لیست";
  static info = "اطلاعات";
  static total_contacts = "تعداد مخاطبین";
  static seen = "مشاهده شده";
  static unseen = "مشاهده نشده";
  static sender = "فرستنده";

  static calculate_sub_departments = "احتساب دپارتمان های زیرمجموعه";
  static select_department = "انتخاب دپارتمان";
  static my_personal_statistics = "آمار شخصی";

  static accounts = "حساب ها";
  static tafsil_types = "انواع تفصیل";
  static tafsil_type = "نوع تفصیل";
  static parent_tafsil_type = "نوع تفصیل پدر";
  static base_module = "ماژول پایه";
  static base_module_item_id = "شناسه آیتم ماژول پایه";
  static base_module_item_title = "عنوان آیتم ماژول پایه";
  static start_code = "اولین کد پیش فرض";
  static tafsil_accounts = "حساب های تفصیلی";
  static tafsil_account = "حساب تفصیلی";
  static code_length = "طول کد طبقه بندی";
  static account_structures = "ساختار حساب ها";
  static new_group = "گروه جدید";
  static new_total = "حساب کل جدید";
  static new_moein = "حساب معین جدید";
  static group_code = "کد گروه";
  static account_type = "نوع حساب";
  static nature = "ماهیت";
  static total_code = "کد";
  static moein_code = "کد معین";
  static account_group = "گروه حساب";
  static account_total = "حساب کل";
  static account_moein = "حساب معین";
  static account_control_type = "کنترل ماهیت حساب طی دوره";
  static is_convertable = "تسعیر پذیر";
  static tafsil_levels = "سطوح تفصیلی";
  static tafsil_level = "سطح تفصیل";
  static level_4 = "سطح چهار";
  static level_5 = "سطح پنج";
  static level_6 = "سطح شش";
  static level_7 = "سطح هفت";
  static level_8 = "سطح هشت";

  static company_bank_accounts = "حساب های بانکی شرکت";
  static credit = "اعتبار حساب";
  static currency_type = "نوع ارز";
  static tafsil_info = "اطلاعات تفصیلی";
  static company_bank_account_info = "اطلاعات حساب بانکی";

  static cash_boxes = "صندوق ها";
  static cash_box = "صندوق";
  static cashier = "صندوق دار";
  static location = "محل فیزیکی";
  static cash_box_info = "اطلاعات صندوق";

  static cheque_books = "دسته چک ها";
  static cheque_book_series = "سری دسته چک";
  static total_pages = "تعداد برگ";
  static start_serial_no = "سریال شروع";
  static sayad_cheque = "چک صیاد";
  static remained_pages = "تعداد برگ باقی مانده";
  static first_usable_serial_no = "شماره سریال اولین برگ قابل استفاده";
  static cheque_items = "اقلام چک";
  static serial_no = "شماره سریال";
  static sayad_no = "شماره صیاد";
  static bank_account = "حساب بانکی";
  static used_cheques = "چک های صادرشده";
  static cheque_book_info = "اطلاعات دسته چک";

  static cash_flows = "عوامل گردش نقدینگی";
  static cash_flow = "عامل گردش نقدینگی";
  static show_in_receip_operation = "نمایش در عملیات دریافت";
  static show_in_payment_operation = "نمایش در عملیات پرداخت";
  static show_in_fund_summary_operation = "نمایش در صورت خلاصه تنخواه";
  static tafsil_type_level_4 = "نوع تفصیلی سطح 4";
  static tafsil_type_level_5 = "نوع تفصیلی سطح 5";
  static tafsil_type_level_6 = "نوع تفصیلی سطح 6";
  static fix_side_4 = "طرف ثابت 4";
  static fix_side_5 = "طرف ثابت 5";
  static fix_side_6 = "طرف ثابت 6";
  static related_tafsil_levels = "سطوح تفصیلی مرتبط";
  static level = "سطح";
  static show_in_operation = "نمایش در عملیات";
  static receipt = "دریافت";
  static payment = "پرداخت";
  static fund_summary = "صورت خلاصه تنخواه";

  static financial_operations = "عملیات حسابداری";
  static financial_operation = "عمیات حسابداری";
  static financial_operation_type = "نوع عملیات حسابداری";
  static item_type = "نوع قلم";
  static paper_nature = "ماهیت چک/سفته";
  static duration_type = "نوع مدت";
  static is_default = "پیش فرض";

  static standard_descriptions = "شرح های استاندارد";
  static standard_description = "شرح";

  static receive_requests = "درخواست های دریافت";
  static receive_request = "درخواست دریافت";
  static front_side = "طرف مقابل";
  static due_date = "تاریخ سررسید";
  static settlement_date = "تاریخ تسویه";
  static base_specifications = "مشخصات مبنا";
  static receive_base = "مبنای دریافت";
  static base_doc_date = "تاریخ سند مبنا";
  static base_doc_id = "شناسه سند مبنا";
  static base_doc_price = "مبلغ سند مبنا";
  static receive_date = "تاریخ دریافت";
  static receive_type = "قلم دریافتی";
  static delivery_member = "";
  static receive_date = "";
  static front_side_account_id = "شناسه حساب طرف مقابل";
  static front_side_account = "حساب طرف مقابل";
  static currency = "ارز";
  static requestable_balance = "مانده قابل درخواست";
  static receive_items = "اقلام دریافتی";
  static no_receive_item = "قلم دریافتی ثبت نشده است";
  static price = "مبلغ";
  static from_receive_date = "تاریخ دریافت از";
  static to_receive_date = "تاریخ دریافت تا";
  static from_settlement_date = "تاریخ تسویه از";
  static to_settlement_date = "تاریخ تسویه تا";
  static submit_and_approve = "ثبت و تایید";

  static receive_request_status_1 = "ثبت شده";
  static receive_request_status_2 = "تایید شده";
  static receive_request_status_3 = "رد شده";

  static receive_receipts = "رسیدهای دریافت";
  static receive_receipt = "رسید دریافت";
  static cheque = "چک";
  static demand = "سفته";
  static cash = "وجه نقد";
  static payment_notice = "اعلامیه واریز";
  static return_from_other = "برگشت از واگذاری به غیر";
  static return_payable_cheque = "استرداد چک پرداختنی";
  static return_payable_demand = "استرداد سفته پرداختنی";
  static receipt_receive_type = "نوع دریافت";
  static delivery_member = "تحویل دهنده";
  static receive_date = "تاریخ دریافت";
  static cheque_series = "سری عددی چک";
  static agreed_date = "تاریخ توافق شده";
  static cheque_no = "شماره چک";

  static collector_agents = "ماموران وصول";
  static collector_agent = "مامور وصول";
  static allocated_ceiling = "سقف واگذاری";
  static appointment_date = "تاریخ انتصاب";
  static ryal = "ریال";

  static funds = "تنخواه";
  static fund = "تنخواه";
  static funder_member = "تنخواه دار";
  static establish_date = "تاریخ استقرار";
  static initial_inventory = "موجودی اولیه";
  static max_inventory = "سقف موجودی";
  static fund_info = "اطلاعات تنخواه";

  static financial_periods = "دوره های مالی";
  static ledgers = "دفاتر کل";
  static ledger = "دفتر کل";
  static financial_doc_types = "انواع سند";
  static is_main_ledger = "دفتر کل اصلی";
  static is_docable_ledger = "امکان صدور سند حسابداری در دفتر کل";
  static financial_year = "سال مالی";
  static financial_years = "سال های مالی";

  static treasury_basic_info = "خزانه داری - پایه";
  static treasury_receive = "خزانه داری - دریافت";

  static bank_types = "انواع بانک";
  static bank_type = "نوع بانک";
  static pr_tel_no = "تلفن روابط عمومی";
  static website = "وب سایت";
  static swift_code = "کد سوئیفت";
  static bank_account_types = "انواع حساب بانکی";
  static bank_account_type = "نوع حساب بانکی";
  static with_cheque = "دارای دسته چک";
  static bank_branches = "شعب بانکی";
  static bank_branch = "شعبه بانک";
  static branch_code = "کد شعبه";
  static tel_no = "شماره تلفن";
  static regards = "بابت";
  static doc_type = "نوع سند";
  static person_company_bank_accounts = "حساب های بانکی";
  static pc_person = "شخص";
  static pc_company = "شرکت";
  static pc_person_company = "شخص/شرکت";
  static in_black_list = "در لیست سیاه";

  static bach = "بچ";
  static bach_info = "اطلاعات بچ";
  static bach_no = "شماره بچ";

  static client_types = "انواع میهمان";
  static client_type = "سطح میهمان";
  static client_counts = "تعداد میهمانان";
  static clients = "میهمانان";
  static fruit = "میوه";
  static sweet = "شیرینی";
  static breakfast = "صبحانه";
  static lunch = "نهار";
  static dinner = "شام";
  static estimated_entry_time = "زمان تقریبی ورود";
  static session_locations = "محل برگزاری جلسات";
  static session_location = "محل برگزاری جلسه";
  static client_type_services = "سرویس های پذیرایی";
  static dishes = "ظروف";
  static foods = "مواد عذایی";
  static needed_facilities = "امکانات مورد نیاز";
  static client_type_details_text = "توضیحات تشریفات";
  static subject = "موضوع";
  static ceremony_requests = "تشریفات";
  static ceremony_requests_official = "تشریفات (اداری)";
  static ceremony_options = "درخواست ها";

  static personal_transfer = "جابجایی شخصی";
  static personal_transfer_department = "جابجایی شخصی (دپارتمان)";
  static personal_transfer_official = "جابجایی شخصی (اداری)";
  static personal_transfer_store = "جابجایی شخصی (انبار)";
  static from_role = "سمت در مبدا";
  static to_role = "سمت در مقصد";

  static store_experts = "مسئولین انبار";
  static store_manager = "مسئول انبار";
  static informatic_experts = "کارشناسان انفورماتیک";
  static financial_experts = "کارشناسان مالی";
  static ceremony_experts = "کارشناسان تشریفات";

  static stores = "انبارها";
  static store = "انبار";
  static product_nature = "ماهیت کالا";
  static tafsil_id = "شناسه تفصیل";
  static tafsil_title = "عنوان تفصیل";
  static tafsil_code = "کد تفصیل";
  static is_decimal = "اعشاری";
  static measure_types = "ابعاد سنجش";
  static measure_type = "بعد سنجش";
  static measure_units = "واحدهای سنجش";
  static measure_unit = "واحد سنجش";
  static measure_converts = "ضریب تبدیل واحدها";
  static measure_convert = "ضریب تبدیل واحد";
  static pricing_types = "روش های قیمت گذاری";
  static pricing_type = "روش قیمت گذاری";
  static product_categories = "طبقه های کالا";
  static product_category = "طبقه کالا";
  static value_type = "نوع داده";
  static features = "ویژگی ها";
  static products = "کالاها";
  static product = "کالا";
  static product_code = "کد کالا";
  static is_buyable = "خریدنی";
  static is_salable = "قابل فروش";
  static is_buildable = "ساختنی";
  static product_feature = "ویژگی کالا";
  static new_feature = "ویژگی جدید";
  static new_measure_unit = "واحد سنجش جدید";
  static new_measure_unit = "واحد سنجش جدید";
  static new_measure_convert = "ضریب تبدیل جدید";
  static feature = "ویژگی";
  static value = "مقدار";
  static default_measure_unit = "واحد سنجش پیش فرض";
  static default = "پیش فرض";
  static new_measure_convert = "ضریب تبدیل جدید";
  static from_measure_unit = "واحد مبدا";
  static from_measure_value = "مقدار مبدا";
  static to_measure_unit = "واحد مقصد";
  static to_measure_value = "مقدار مقصد";
  static tolerance = "تلورانس";
  static new_store = "انبار جدید";
  static inventory_control_agents = "عامل های کنترل موجودی";
  static inventory_control_agent = "عامل کنترل موجودی";
  static effective_in_pricing = "موثر در قیمت گذاری";
  static effective_in_warehousing = "موثر در انبارگردانی";
  static new_inventory_control_agent = "عامل کنترل موجودی جدید";
  static spare_part = "قابل استفاده به عنوان قطعه یدکی";
  static fix_property = "قابل استفاده در دارایی ثابت";
  static bach_patterns = "الگوهای بچ";
  static bach_pattern = "الگوی بچ";
  static select = "انتخاب";
  static is_system_agent = "عامل سیستمی";

  static user_account = "حساب کاربری";
  static visit_user_account = "مشاهده حساب کاربری";
  static main_page = "صفحه اصلی";
  static profile = "پروفایل";
  static change_password = "تغییر رمز";
  static current_password = "رمز عبور فعلی";
  static new_password = "رمز عبور جدید";
  static confirm_new_password = "تکرار رمز عبور جدید";
  static forget_password = "بازیابی رمز عبور";

  static from_department = "دپارتمان مبدا";
  static to_department = "دپارتمان مقصد";
  static delivery_properties = "تحویل اموال";
  static receiving_properties = "دریافت اموال";
  static management_transfer_official = "جابجایی مدیریتی (اداری)";
  static management_transfer_store = "جابجایی مدیریتی (انبار)";
  static management_transfer_employee = "جابجایی مدیریتی (کارمند)";
  static management_transfer_department = "جابجایی مدیریتی (دپارتمان)";
  static approved_store_report =
    "گزارش انبار مبنی بر تحویل و دریافت کالا مورد تایید اینجانب می باشد";
  static approve_transfer = "تایید جابجایی";
  static cancel_transfer = "لفو جابجایی";
  static just_unseen_transfers = "فقط جابجایی های جدید";

  static checkout_departmnent = "تسویه حساب (دپارتمان)";
  static checkout_official = "تسویه حساب (اداری)";
  static checkout_informatic = "تسویه حساب (انفورماتیک)";
  static checkout_store = "تسویه حساب (انبار)";
  static checkout_financial = "تسویه حساب (مالی)";

  static my_violation_announcement = "ابلاغیه های تخلف";
  static violation_person = "کارمند خاطی";
  static violations = "گزارش تخلف";
  static violations_official = "گزارش تخلف (اداری)";
  static submit_vote = "ثبت رای";
  static vote_status = "وضعیت رای";
  static announcement = "ابلاغیه";
  static submit_announcement = "صدور ابلاغیه";
  static show_violer_name = "نمایش نام شاکی";
  static show_violer_request_details = "نمایش توضیحات شاکی";
  static accept_violation = "تایید تخلف";
  static reject_violation = "رد تخلف";
  static department_violation_responses = "آرای تخلف کارکنان";
  static just_new_violation_response = "فقط آرای جدید";
  static violation_responses = "آرای تخلف";
  static audience = "خوانده";

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
  static others_tasks = "وظایف کاربران";
  static department_tasks = "وظایف دپارتمان";
  static departments_tasks = "وظایف دپارتمان ها";
  static colleagues_tasks = "وظایف همکاران";

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
  static financial = "مالی";
  //----
  static store_management = "مدیریت انبار";
  static store_basic_info = "اطلاعات پایه انبار";
  static public_settings = "تنظیمات عمومی";
  static projects = "پروژه ها";
  static cost_center_types = "انواع مرکز هزینه";
  static cost_center_type = "نوع مرکز هزینه";
  static cost_centers = "مراکز هزینه";
  static cost_center = "مرکز هزینه";
  static currencies = "ارزها";
  static default_currency = "ارز پیش فرض";
  static currency_ratios = "نسبت تبدیل ارزها";
  static ratio = "نسبت تبدیل";
  static from_currency = "ارز مبدا";
  static to_currency = "ارز مقصد";
  static credit_source_types = "انواع منابع تامین اعتبار";
  static credit_source_type = "نوع منابع تامین اعتبار";
  static credit_sources = "منابع تامین اعتبار";
  static credit_source = "منبع تامین اعتبار";
  //----
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

  static edocs = "اسناد الکترونیک";
  static folder_groups = "گروه های پرونده";
  static folder_group = "گروه پرونده";
  static folders_structure = "ساختار پوشه ها";
  static folders = "پوشه ها";
  static folder = "پوشه";
  static parent_folder = "پوشه والد";
  static new_access = "دسترسی جدید";
  static access_path = "مسیر دسترسی";
  static select_folder = "انتخاب پوشه";

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
    task_done: "خاتمه وظیفه ثبت شد",
    submit_report_in_done_task_failed:
      "ثبت گزارش در وظیفه خاتمه یافته امکان پذیر نمی باشد",
    not_any_tasks_founded: "وظیفه ای یافت نشد",
    submit_response_in_finished_dismissal_request_failed:
      "قبلا به این درخواست پاسخ داده شده است",
    submit_response_in_finished_edu_fund_request_failed:
      "قبلا به این درخواست پاسخ داده شده است",
    submit_response_in_finished_violation_request_failed:
      "قبلا برای این درخواست رای صادر شده است",
    announcement_already_submitted: "ابلاغیه قبلا صادر شده است",
    no_any_announcement: "ابلاغیه ای ثبت نشده است",
    submit_response_in_finished_checkout_request_failed:
      "قبلا به این درخواست پاسخ داده شده است",
    submit_response_in_finished_management_transfer_request_failed:
      "قبلا به این درخواست پاسخ داده شده است",
    submit_response_in_finished_personal_transfer_request_failed:
      "قبلا به این درخواست پاسخ داده شده است",
    not_submit_response_when_not_approved_store_report:
      "در صورت عدم تایید گزارش انبار مبنی بر تحویل و دریافت کالا، از ثبت پاسخ خودداری فرموده و موارد را از طریق واحد اداری پیگیری بفرمایید",
    submit_response_in_finished_ceremony_request_failed:
      "قبلا به این درخواست پاسخ داده شده است",
    no_feature_selected: "هیچ ویژگی ای ثبت نشده است",
    difference_between_new_pass_and_its_confirm:
      "رمز عبور جدید و تکرار آن همخوانی ندارند",
    new_password_is_same_as_current_password:
      "رمز عبور جدید وارد شده مشابه رمز عبور فعلی می باشد",
    no_financial_year_selected: "سال مالی ثبت نشده است",
    financial_year_no_already_exists: "سال مالی قبلا ثبت شده است",
  };

  static questions = {
    sure_to_logout: "برای خروج از سامانه اطمینان دارید؟",
    sure_to_delete_item: "برای حذف رکورد انتخابی اطمینان دارید؟",
    sure_to_delete_image: "برای حذف تصویر اطمینان دارید؟",
    sure_to_delete_feature: "برای حذف ویژگی کالا اطمینان دارید؟",
    sure_to_delete_measure_unit: "برای حذف واحد سنجش کالا اطمینان دارید؟",
    sure_to_delete_store: "برای حذف انبار کالا اطمینان دارید؟",
    sure_to_delete_inventory_control_agent:
      "برای حذف عامل کنترل موجودی کالا اطمینان دارید؟",
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
    sure_to_submit_announcement: "برای ثبت ابلاغیه اطمینان دارید؟",
    sure_to_delete_announcement: "برای حذف ابلاغیه اطمینان دارید؟",
    vehicle_request_approved: "درخواست وسیله نقلیه مورد تایید است؟",
    hoteling_request_approved: "درخواست اقامتگاه مورد تایید است؟",
    sure_to_delete_bach_pattern_feature:
      "برای حذف ویژگی الگوی بچ اطمینان دارید؟",
    sure_to_delete_folder: "برای حذف پوشه اطمینان دارید؟",
    sure_to_delete_permission: "برای حذف دسترسی اطمینان دارید؟",
    sure_to_delete_announce: "برای حذف اطلاعیه اطمینان دارید؟",
    sure_to_delete_selected_item: "برای حذف آیتم انتخابی اطمینان دارید؟",
    sure_to_delete_financial_year: "برای حذف سال مالی اطمینان دارید؟",
    sure_to_reject_request: "برای رد درخواست اطمینان دارید؟",
    sure_to_submit_approve_request: "برای ثبت و تایید درخواست اطمینان دارید؟",
    sure_to_submit_approve_receive_receipt:
      "برای ثبت و تایید رسید دریافت اطمینان دارید؟",
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
